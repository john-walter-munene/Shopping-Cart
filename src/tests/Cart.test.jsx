// Dev testing
import { describe, test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

// Component under test and API sample data
import { ShoppingCart } from "../components/Cart";
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
    test('Cart renders empty cart correctly', async () => {
        renderWithRouter(<ShoppingCart cart={[]} setCart={() => {}} />);
        const emptyCartIndicator = await screen.findByTestId("empty-cart");
        expect(emptyCartIndicator.textContent).toBe("Your Cart is empty. Please add some items 🙊");
    });

    test('Populated cart renders cart items', () => {
        renderWithRouter(<ShoppingCartTestHarness />);

        // Empty cart indicator should NOT exist
        const emptyCartIndicator = screen.queryByTestId("empty-cart");
        expect(emptyCartIndicator).not.toBeInTheDocument();

        // All cart items
        const cartItemCards = screen.getAllByTestId("cart-item");
        expect(cartItemCards.length).toBe(mockCartItemsFromProducts.length);

        // Total items display exists
        const totalItemsDisplay = screen.getByTestId("cart-items-count");
        expect(Number(totalItemsDisplay.textContent.replace("Total Items: ", "")))
            .toBe(countItemsRecursive(mockCartItemsFromProducts));
    });

    test('Items prices are counted correctly', () => {
        renderWithRouter(<ShoppingCartTestHarness />);

        const totalPriceElement = screen.getByTestId("total-price");
        const totalPrice = Number(totalPriceElement.textContent.replace("Total Price: $", ""));
        expect(totalPrice).toBe(formatNumber(countPriceRecursive(mockCartItemsFromProducts)));
    });
});

describe('Cart behavior tests: actions expectations', () => {
    test('removes a product category', async () => {
        renderWithRouter(<ShoppingCartTestHarness />);
        const user = userEvent.setup();

        const cartItemsBefore = screen.getAllByTestId("cart-item");
        expect(cartItemsBefore.length).toBe(mockCartItemsFromProducts.length);

        const randomIndex = Math.floor(Math.random() * cartItemsBefore.length);
        const itemToRemove = cartItemsBefore[randomIndex];
        const removeButton = itemToRemove.querySelector("button");
        await user.click(removeButton);

        await waitFor(() => {
            const updatedItems = screen.getAllByTestId("cart-item");
            expect(updatedItems.length).toBe(cartItemsBefore.length - 1);
        });
    });

    test('removes all items one by one', async () => {
        renderWithRouter(<ShoppingCartTestHarness />);
        const user = userEvent.setup();

        let cartItems = screen.getAllByTestId("cart-item");

        while (cartItems.length > 0) {
            const removeButton = cartItems[0].querySelector("button");
            await user.click(removeButton);
            await waitFor(() => {
                cartItems = screen.queryAllByTestId("cart-item");
            });
        }

        const emptyCartIndicator = screen.getByTestId("empty-cart");
        expect(emptyCartIndicator.textContent).toBe("Your Cart is empty. Please add some items 🙊");
    });

    // test('increases items in a product category', async () => {
    //     renderWithRouter(<ShoppingCartTestHarness />);
    //     const user = userEvent.setup();

    //     const cartItems = screen.getAllByTestId("cart-item");
    //     for (const cartItem of cartItems) {
    //         const totalItemsBefore = Number(screen.getAllByTestId("cart-items-count").textContent.replace("Total Items: ", ""));
    //         const increaseButton = cartItem.querySelector("button:nth-child(3)");
    //         await user.click(increaseButton);

    //         await waitFor(() => {
    //             const totalItemsAfter = Number(screen.getByTestId("cart-items-count").textContent.replace("Total Items: ", ""));
    //             expect(totalItemsAfter - totalItemsBefore).toBe(1);
    //         });
    //     }
    // });

    test("increases items in a product category", async () => {
    renderWithRouter(<ShoppingCartTestHarness />);
    const user = userEvent.setup();

    const cartItems = screen.getAllByTestId("cart-item");

    for (const cartItem of cartItems) {
      const totalItemsBefore = Number(
        screen.getByTestId("cart-total-items").textContent.replace("Total Items: ", "")
      );

      const increaseButton = cartItem.querySelector("button:nth-child(3)");
      await user.click(increaseButton);

      await waitFor(() => {
        const totalItemsAfter = Number(
          screen.getByTestId("cart-total-items").textContent.replace("Total Items: ", "")
        );
        expect(totalItemsAfter - totalItemsBefore).toBe(1);
      });
    }
  })

    test('decreases items in a product category', async () => {
    renderWithRouter(<ShoppingCartTestHarness />);
    const user = userEvent.setup();

    // Wait until cart-items-count exists (cart is populated)
    let totalItemsElement = await screen.findByTestId("cart-items-count");
    let totalItems = Number(totalItemsElement.textContent.replace("Total Items: ", ""));

    // Loop until all items are removed
    while (totalItems > 0) {
        const cartItem = screen.queryAllByTestId("cart-item")[0];
        const decreaseButton = cartItem.querySelector("button:nth-child(2)");
        await user.click(decreaseButton);

        await waitFor(() => {
            // Re-query cart-items-count to get updated total
            totalItemsElement = screen.getByTestId("cart-items-count");
            totalItems = Number(totalItemsElement.textContent.replace("Total Items: ", ""));
        });
    }

    // After all items are removed
    const emptyCartIndicator = screen.getByTestId("empty-cart");
    expect(totalItems).toBe(0);
    expect(emptyCartIndicator.textContent).toBe("Your Cart is empty. Please add some items 🙊");
});

});