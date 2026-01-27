// Dev testing tools.
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Components tied to testing.
import { Home } from '../components/home/Home';
import { ShoppingPage } from '../components/shop/Shop';
import { ShoppingCart } from '../components/cart/Cart';

// Simple helper to render a page with routing context
function renderWithRouter(userInterface) {
    return render(<MemoryRouter>{userInterface}</MemoryRouter>);
}

// Map of routes to their components, expected classes, and layout children components.
const routes = [
    {
        path: '/',
        component: <Home />,
        mainClass: 'home-page',
        expectedChildren: 8 
    },
    {
        path: '/shop',
        component: <ShoppingPage products={[]} setProducts={() => {}} cart={[]} setCart={() => {}} />,
        mainClass: 'shop-page',
        expectedChildren: 3 
    },
    {
        path: '/cart',
        component: <ShoppingCart cart={[]} setCart={() => {}} />,
        mainClass: 'cart-page',
        expectedChildren: 3
    },
];

// Application routes render the correct content.
describe('App routing', () => {
    routes.forEach(({ path, component, mainClass, expectedChildren }) => {
        test(`Renders correct page for route "${path}"`, () => {
            const { container } = renderWithRouter(component);

            // Navigation is always present
            expect(screen.getByRole('navigation')).toBeInTheDocument();

            // Main page container
            const mainPage = container.querySelector(`.${mainClass}`);
            expect(mainPage).toBeInTheDocument();

            // Confirm expected number of children
            expect(mainPage.children.length).toBe(expectedChildren);

            // Footer is always present
            const footer = container.querySelector('.cartify-footer');
            expect(footer).toBeInTheDocument();
        });
    });
});

// Navigation component ruotes user to the correct page.
describe('Integration test to confirm that the links ensure correct navigation', () => {
    function AppTestShell() {
        return (
            <>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<ShoppingPage products={[]} setProducts={() => {}} cart={[]} setCart={() => {}} />} />
                    <Route path="/cart" element={<ShoppingCart cart={[]} setCart={() => {}} />} />
                </Routes>
            </>
        );
    }

    test('Navigation flow: Home → Shop → Cart → Home', async () => {
        const user = userEvent.setup();

        render(<MemoryRouter initialEntries={['/']}><AppTestShell /></MemoryRouter>);

        // Home
        expect(screen.getByRole('main')).toHaveClass('home-page');

        // Shop
        await user.click(screen.getByTestId('Shop'));
        expect(screen.getByRole('main')).toHaveClass('shop-page');

        // Cart
        await user.click(screen.getByTestId('Cart'));
        expect(screen.getByRole('main')).toHaveClass('cart-page');

        // Back Home
        await user.click(screen.getByTestId('Home'));
        expect(screen.getByRole('main')).toHaveClass('home-page');
    });
});