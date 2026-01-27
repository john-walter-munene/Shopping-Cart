import { describe, expect } from "vitest";
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

        render(
            <MemoryRouter>
                <NavBar navigationLinks={navLinks} />
            </MemoryRouter>
        );

        const navigationElements = screen.getByRole('navigation');
        expect(navigationElements).toBeDefined();
        expect(navigationElements.children.length).toBe(navLinks.length); // safer

        navLinks.forEach((link) => expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.path));
    });
    
    test('Navigation bar shows the number of items in the cart correctly', () => {
        const { container } = render(
            <MemoryRouter>
                <NavBar displayCartItemsCount={true} cartItemsCount={10} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('cart-items-count')).toBeInTheDocument();
        const itemsCount = container.querySelector('.cart-items-count-display p');
        expect(Number(itemsCount.textContent)).toBe(10);
    });
});