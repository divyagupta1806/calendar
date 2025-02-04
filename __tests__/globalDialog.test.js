import React from "react";
import { render, screen } from "@testing-library/react";
import GlobalDialog from "../src/components/GlobalDialog";

describe("GlobalDialog Component", () => {
  test("renders children correctly", () => {
    render(
      <GlobalDialog>
        <div>Test Content</div>
      </GlobalDialog>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("applies the correct class names", () => {
    const { container } = render(
      <GlobalDialog className="custom-class">
        <div>Test Content</div>
      </GlobalDialog>
    );

    expect(container.firstChild).toHaveClass("custom-class");
    expect(container.firstChild).toHaveClass("fixed");
    expect(container.firstChild).toHaveClass("top-0");
    expect(container.firstChild).toHaveClass("left-0");
    expect(container.firstChild).toHaveClass("w-full");
    expect(container.firstChild).toHaveClass("h-full");
    expect(container.firstChild).toHaveClass("flex");
    expect(container.firstChild).toHaveClass("items-center");
    expect(container.firstChild).toHaveClass("justify-center");
    expect(container.firstChild).toHaveClass("bg-black");
    expect(container.firstChild).toHaveClass("bg-opacity-50");
  });

  test("renders with default styles when no className is passed", () => {
    const { container } = render(
      <GlobalDialog>
        <div>Test Content</div>
      </GlobalDialog>
    );

    expect(container.firstChild).toHaveClass("fixed");
    expect(container.firstChild).toHaveClass("top-0");
    expect(container.firstChild).toHaveClass("left-0");
    expect(container.firstChild).toHaveClass("w-full");
    expect(container.firstChild).toHaveClass("h-full");
    expect(container.firstChild).toHaveClass("flex");
    expect(container.firstChild).toHaveClass("items-center");
    expect(container.firstChild).toHaveClass("justify-center");
    expect(container.firstChild).toHaveClass("bg-black");
    expect(container.firstChild).toHaveClass("bg-opacity-50");
  });
});
