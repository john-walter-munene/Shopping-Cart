// Test runner kit tools
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// Components to be tested
import App from '../App'

describe("Tool setup", () => {
    it("renders correctly", () => {
        render(<App />);
        expect(screen.getByRole("heading").textContent).toMatch("Vite + React");
    });
});