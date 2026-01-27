// Dev testing tools.
import { describe, test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

// Component under test and API sample data.
import { ShoppingPage } from "../components/shop/Shop";
import { shoppingCartProducts, formatNumber } from "../components/utils"; // values for mock api fetch and util func

// // Simple helper to render a page with routing context
function renderWithRouter(userInterface) {
    return render(<MemoryRouter>{userInterface}</MemoryRouter>);
}

// Mock props
const mockSetProducts = vi.fn();
const mockSetCart = vi.fn();

// Mock application holder to test fetch -> product updates -> render
function ShoppingPageTestHarness() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    return (<ShoppingPage products={products} setProducts={setProducts} cart={cart} setCart={setCart} />);
}

describe('Shopping Page Logic UI Tests', () => {
    test('Displays loading state correctly', () => {
        // Render shopping page with empty products and cart.
        const { container } = renderWithRouter(<ShoppingPage products={[]} setProducts={mockSetProducts} cart={[]} setCart={mockSetCart} />);

        // Check that the loading message is visible.
        expect(screen.getByText(/Hang on, loading shop products/i)).toBeInTheDocument();

        // Check that the spinner element is rendered
        expect(container.querySelector('.loading-spinner')).toBeInTheDocument();

        // Ensure no product cards are rendered yet
        expect(container.querySelectorAll('.product-card').length).toBe(0);
    });

    test('Displays error state correctly', async () => {
        // define fetch BEFORE render
        globalThis.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error')); 

        const { container } = renderWithRouter(<ShoppingPage products={[]} setProducts={mockSetProducts} cart={[]} setCart={mockSetCart} />);

        // Wait for the error message to appear and loader removed
        expect(await screen.findByText(/Application error, we are working to resolve it/i)).toBeInTheDocument();
        expect(container.querySelector('.loading-spinner')).not.toBeInTheDocument();

        expect(container.querySelector('.products-load-error')).toBeInTheDocument();
        expect(container.querySelectorAll('.product-card').length).toBe(0);
    });

    test('Successful products fetch displays products correctly', async () => {
        globalThis.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve(shoppingCartProducts), }));

        const { container } = renderWithRouter(<ShoppingPageTestHarness />);

        // Wait for the product cards to appear in the DOM
        await waitFor(() => expect(container.querySelectorAll('.product-card').length).toBe(shoppingCartProducts.length));

        expect(container.querySelector('.loading-spinner')).not.toBeInTheDocument();
        expect(container.querySelector('.products-load-error')).not.toBeInTheDocument();
        expect(container.querySelectorAll('.product-card').length).toBe(shoppingCartProducts.length);
    });
});

describe('Shopping page behavior tests: user actions vs ui response', () => {
    test('Product quantity updates correctly', async () => {
        globalThis.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve(shoppingCartProducts)}));
        const user = userEvent.setup();

        const { container } = renderWithRouter(<ShoppingPageTestHarness />);
        await waitFor(() => expect(container.querySelectorAll('.product-card').length).toBe(shoppingCartProducts.length));
        const productCards = container.querySelectorAll('.product-card');
        
        // Ensure each card has its input updating correctly.
        for (const productCard of productCards) {
            const input = productCard.querySelector('input[type="number"]');
            const priceElement = productCard.querySelector('.product-details p:last-of-type'); // last <p> is the price
            const finalPriceElement = productCard.querySelector('.product-price');

            await user.clear(input);       // Clear any existing value
            await user.type(input, '10');  // Type quantity 10

            // Get numeric price
            const priceValue = Number(priceElement.textContent.replace('$', ''));
            const expectedFinalPrice = formatNumber(priceValue * 10);

            // Wait for React to update the DOM
            await waitFor(() => expect(finalPriceElement.textContent).toContain(expectedFinalPrice.toString()));
        };
    });

    test('Adding a product to cart with empty quantity fires the alert', async () => {
        // Mock fetch for product data
        globalThis.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve(shoppingCartProducts) }));

        // Spy on alert to catch it
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        const user = userEvent.setup();
        const { container } = renderWithRouter(<ShoppingPageTestHarness />);

        // Wait for all products to render
        await waitFor(() => expect(container.querySelectorAll('.product-card').length).toBe(shoppingCartProducts.length));

        const productCards = container.querySelectorAll('.product-card');

        // Click each product's add-to-cart button with quantity = 0
        for (const productCard of productCards) {
            const addToCartButton = productCard.querySelector('button.add-to-cart');
            await user.click(addToCartButton);

            // Assert alert was called
            const title = productCard.querySelector('.product-details h3').textContent;
            expect(alertSpy).toHaveBeenCalledWith(`Please select a quantity for ${title}`);
        }

        // Restore original alert
        alertSpy.mockRestore();
    });

    test('Adding more than a single item per product is susccessful', async () => {
        globalThis.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve(shoppingCartProducts)}));
        const user = userEvent.setup();

        const { container } = renderWithRouter(<ShoppingPageTestHarness />);
        await waitFor(() => expect(container.querySelectorAll('.product-card').length).toBe(shoppingCartProducts.length));
        const productCards = container.querySelectorAll('.product-card');

        for (const productCard of productCards) {
            // Get input, clear it, add some arbitrary value
            const input = productCard.querySelector('input[type="number"]');
            await user.clear(input)
            await user.type(input, '10');

            // Get cart items count before click.
            const previousCartItemsCount = Number(container.querySelector('.cart-items-count-display p').textContent);
            
            // Make additions to the cart.
            const addToCartButton = productCard.querySelector('button.add-to-cart');
            await user.click(addToCartButton);

            // Expectations: items to be cumulatively added on each iteration, and the input to have been reset to 0
            const newCartItemsCount = Number(container.querySelector('.cart-items-count-display p').textContent);
            expect(previousCartItemsCount + 10).toBe(newCartItemsCount);
            
            await waitFor(() => {
                const newInput = productCard.querySelector('input[type="number"]');
                expect(Number(newInput.value)).toBe(0);
            });
        }
    });
});