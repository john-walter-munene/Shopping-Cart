// Dev testing
import { describe, test, expect, } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

// Component under test and API sample data
import { ShoppingCart } from "../components/cart/Cart";
import { shoppingCartProducts, formatNumber, countItemsRecursive, countPriceRecursive } from "../components/utils";

// Helper function to provide a routing context.
function renderWithRouter(userInterface) {
    return render(<MemoryRouter>{userInterface}</MemoryRouter>);
}

// Mock props and application shell
const mockCartItemsFromProducts = shoppingCartProducts.map((product) => {
    const { image, title, price, id } = product;
    return { id, title, quantity: 1, price, image };
});

function ShoppingCartTestHarness() {
    const [cart, setCart] = useState(mockCartItemsFromProducts);

    return (<ShoppingCart cart={cart} setCart={setCart} />);
}

describe('Cart UI logic tests', () => {
    test('Cart render empty cart correctly', () => {
        const { container } = renderWithRouter(<ShoppingCart  cart={[]} setCart={() => {}}/>);
        const emptyCartIndicator = container.querySelector('.empty-cart p');
        expect(emptyCartIndicator.textContent).toBe("Your Cart is empty. Please add some items");
    });

    test('Populated cart renders some cart items', () => {
        const { container } = renderWithRouter(<ShoppingCartTestHarness />);
        const emptyCartIndicator = container.querySelector('.empty-cart p');
        expect(emptyCartIndicator).not.toBeInTheDocument();
        const cartItemCards = container.querySelectorAll('.cart-item');
        expect(cartItemCards.length).toBe(mockCartItemsFromProducts.length);
    });

    test('Items prices and number are counted correctly', () => {
        const { container } = renderWithRouter(<ShoppingCartTestHarness />);

        // Items are correct
        const totalItems = Number(container.querySelector('.cart-items-count-display p').textContent);
        expect(totalItems).toBe(countItemsRecursive(mockCartItemsFromProducts));

        // Pricing is correct
        const totalPrice = Number(screen.queryByTestId('total-price').textContent.replace('Total Price ', ''));
        expect(totalPrice).toBe(formatNumber(countPriceRecursive(mockCartItemsFromProducts)));
    })
});

describe('Cart behavior tests: actions expectations', () => {
    test('removes a product category', async () => {
        const { container } = renderWithRouter(<ShoppingCartTestHarness />);
        const user = userEvent.setup();

         const initialItems = container.querySelectorAll('.cart-item');

        expect(initialItems.length).toBe(20);

        // pick any item (first, last, random)
        const randomIndex = Math.floor(Math.random() * initialItems.length);

        const itemToRemove = initialItems[randomIndex];
        const removeButton = itemToRemove.querySelector('.cart-item-action button');
        await user.click(removeButton);

        await waitFor(() => {
            const updatedItems = container.querySelectorAll('.cart-item');
            expect(updatedItems.length).toBe(initialItems.length - 1);
        });
    });

    test('removes cart items one by one till none left if all are clicked', async () => {
        const { container } = renderWithRouter(<ShoppingCartTestHarness />);
        const user = userEvent.setup();

        let cartItems = container.querySelectorAll('.cart-item');

        while (cartItems.length > 0) {
            const cartItem = cartItems[0]; // always exists and is the first item.
            const removeButton = cartItem.querySelector('.cart-item-action button:nth-child(1)');

            await user.click(removeButton);
            await waitFor(() => {
                cartItems = container.querySelectorAll('.cart-item');
                expect(cartItems.length).toBeGreaterThanOrEqual(0);
            });
        }
    });

    test('Increases items in product category', async () => {
        const { container } = renderWithRouter(<ShoppingCartTestHarness />);
        const user = userEvent.setup();

        let cartItems = container.querySelectorAll('.cart-item');
        
        for (const cartItem of cartItems) {
            const totalItems = Number(container.querySelector('.cart-items-count-display p').textContent);
            const increaseButton = cartItem.querySelector('.cart-item-action button:nth-child(3)');

            await user.click(increaseButton);

            await waitFor(() => {
                const newTotalNumberofItems = Number(container.querySelector('.cart-items-count-display p').textContent);
                expect(newTotalNumberofItems).toBeGreaterThan(totalItems);
                expect(newTotalNumberofItems - totalItems).toBe(1); // A difference of 1 each time.
            })
        }
    });

    test('Decreases items in product category', async () => {
        const { container } = renderWithRouter(<ShoppingCartTestHarness />);
        const user = userEvent.setup();

        let totalItems = Number(container.querySelector('.cart-items-count-display p').textContent); // 20 to begin

        while (totalItems > 0) {
            const cartItem = container.querySelector('.cart-item');
            const decreaseButton = cartItem.querySelector('.cart-item-action button:nth-child(2)');

            await user.click(decreaseButton);

            await waitFor(() => {
                const newTotal = Number(container.querySelector('.cart-items-count-display p').textContent);
                expect(newTotal).toBe(totalItems - 1);
            });

            totalItems = Number(container.querySelector('.cart-items-count-display p').textContent); // query again.
        }

        expect(totalItems).toBe(0);
        const emptyCartIndicator = container.querySelector('.empty-cart p');
        expect(emptyCartIndicator.textContent).toBe("Your Cart is empty. Please add some items");
    });
});