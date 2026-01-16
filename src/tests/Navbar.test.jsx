import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import { NavBar } from "../components/NavBar";

describe("NavBar", () => {
    const navLinks = ["Home", "Shop", "Cart"];
    
    test("renders a navigation container", () => {
        // Arrange
        render(<NavBar navigationLinks={navLinks} />);

        // Assert
        const nav = screen.getByRole("navigation");
        expect(nav).toBeInTheDocument();
        expect(nav).toBeDefined();
        expect(nav).toHaveClass("navigation-bar");
  });

    test("renders three navigation buttons", () => {
      // Arrange
      render(<NavBar navigationLinks={navLinks} />);

      // Act
      const buttons = screen.getAllByRole("button");
      
      // Assert
      expect(buttons).toHaveLength(3);
    });

    test("each navigation button has correct text and classname", () => {
        render(<NavBar navigationLinks={navLinks} />);

        const buttons = screen.getAllByRole("button");
      
        buttons.forEach((button, index) => {
          expect(button).toHaveClass("navigation-button");
          expect(button).toHaveTextContent(navLinks[index]);
        });
    });

    test("matches snapshot", () => {
      const { container } = render(<NavBar navgationLinks={navLinks} />);
      expect(container).toMatchSnapshot();
    })
});