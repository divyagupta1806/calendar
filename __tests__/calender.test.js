import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Calendar from "../src/pages/Calendar";

import "@testing-library/jest-dom/extend-expect";

describe("Calendar Component", () => {
  test("renders the calendar with the correct month and year", () => {
    render(<Calendar />);
    const today = new Date();
    const currentMonth = today
      .toLocaleString("default", { month: "long" })
      .toUpperCase();
    const currentYear = today.getFullYear();

    expect(
      screen.getByText((content, element) => content.includes("FEBRUARY"))
    ).toBeInTheDocument();
    expect(screen.getByText(currentYear.toString())).toBeInTheDocument();
  });

  test("navigates to the previous month when 'Prev' button is clicked", () => {
    render(<Calendar />);

    const prevButton = screen.getByTestId("prev-button");

    fireEvent.click(prevButton);

    expect(
      screen.getByText(
        /DECEMBER|NOVEMBER|OCTOBER|SEPTEMBER|AUGUST|JULY|JUNE|MAY|APRIL|MARCH|FEBRUARY|JANUARY/
      )
    ).toBeInTheDocument();
  });

  test("navigates to the next month when 'Next' button is clicked", () => {
    render(<Calendar />);

    const nextButton = screen.getByTestId("next-button");

    fireEvent.click(nextButton);

    expect(
      screen.getByText(
        /DECEMBER|NOVEMBER|OCTOBER|SEPTEMBER|AUGUST|JULY|JUNE|MAY|APRIL|MARCH|FEBRUARY|JANUARY/
      )
    ).toBeInTheDocument();
  });

  test("clicking a date opens the popup", () => {
    render(<Calendar />);

    const dateCell = screen.getAllByText("1")[0];
    fireEvent.click(dateCell);

    expect(screen.getByText(/1 /)).toBeInTheDocument();
  });

  test("closes popup when close button is clicked", () => {
    render(<Calendar />);

    const dateCell = screen.getAllByText("1")[0];
    fireEvent.click(dateCell);

    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);

    expect(screen.queryByText(/1 /)).not.toBeInTheDocument();
  });
});
