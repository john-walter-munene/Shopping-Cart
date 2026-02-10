import { describe, test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { NavBar } from "../components/NavBar";

describe("Navigation Bar", () => {

    test('Renders navigation structure and correct links', () => {
        const navLinks = [
            { label: "Home", path: "/" },
            { label: "Shop", path: "/shop" },
            { label: "Cart", path: "/cart" },
            { label: "unknown", path: "/unknown" },
        ];

        render(<MemoryRouter><NavBar navigationLinks={navLinks} /></MemoryRouter>);

        const navigationElements = screen.getByRole('navigation');
        expect(navigationElements).toBeDefined();
        expect(navigationElements.children.length).toBe(navLinks.length);
        navLinks.forEach((link) =>
            expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.path)
        );
    });
    
    test('Navigation bar shows the number of items in the cart correctly', () => {
        render(
            <MemoryRouter>
                <NavBar displayCartItemsCount={true} cartItemsCount={10} />
            </MemoryRouter>
        );

        // Use test ID to get the div
        const cartDisplay = screen.getByTestId('cart-items-count');
        expect(cartDisplay).toBeInTheDocument();

        // Use getByText inside that div to check number
        const itemsCountText = screen.getByText("10");
        expect(itemsCountText).toBeInTheDocument();
    });
});