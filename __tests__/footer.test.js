import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../src/components/Footer";

describe("Footer Component", () => {
  test("renders the footer correctly", () => {
    render(<Footer />);

    expect(screen.getByText(/Full Calendar/i)).toBeInTheDocument();

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`@${currentYear} Full Calendar`)
    ).toBeInTheDocument();
  });

  test("footer is styled with the correct classes", () => {
    const { container } = render(<Footer />);

    const footerDiv = container.querySelector("div");
    expect(footerDiv).toHaveClass("bg-gray-700");
    expect(footerDiv).toHaveClass("text-white");
  });
});
