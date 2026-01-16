import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Home } from "../components/home/Home";

describe("Homepage", () => {
    test("renders navigation bar", () => {
        render(<Home />);
        const nav = screen.getByRole("navigation");
        expect(nav).toBeInTheDocument();
        expect(nav).toBeDefined();
        expect(nav).toHaveClass("navigation-bar");
    });
});