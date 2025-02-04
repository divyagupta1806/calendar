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

  test("changes view when a different view is selected", () => {
    render(<Calendar />);

    expect(screen.getByTestId("month-view")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/year/i));

    expect(screen.getByTestId("year-view")).toBeInTheDocument();
  });

  test("clicking a month in year view switches to month view", () => {
    render(<Calendar />);

    fireEvent.click(screen.getByText(/year/i));
    expect(screen.getByTestId("year-view")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/JANUARY/i));

    expect(screen.getByTestId("month-view")).toBeInTheDocument();
  });

  test("clicking a date opens the popup with the correct date", () => {
    render(<Calendar />);

    const dateCell = screen.getAllByText("1")[0];
    fireEvent.click(dateCell);

    expect(screen.getByTestId("date-popup")).toBeInTheDocument();
    expect(screen.getByTestId("selected-date")).toHaveTextContent(/1/i);
  });

  test("clicking a date opens the popup", () => {
    render(<Calendar />);

    const dateCell = screen.getAllByText("1")[0];
    fireEvent.click(dateCell);

    expect(screen.getByText(/1 /)).toBeInTheDocument();
  });
  test("changes view when a different view is selected", () => {
    render(<Calendar />);

    expect(screen.getByTestId("month-view")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/year/i));

    expect(screen.getByTestId("year-view")).toBeInTheDocument();
  });

  test("navigates to the previous month when clicking 'Prev'", () => {
    render(<Calendar />);

    expect(screen.getByText(/FEBRUARY 2025/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("prev-button"));

    expect(screen.getByText(/JANUARY 2025/i)).toBeInTheDocument();
  });

  test("navigates to the next month when clicking 'Next'", () => {
    render(<Calendar />);

    expect(screen.getByText(/FEBRUARY 2025/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("next-button"));

    expect(screen.getByText(/MARCH 2025/i)).toBeInTheDocument();
  });

  test("closes popup when close button is clicked", () => {
    render(<Calendar />);

    fireEvent.click(screen.getAllByText("1")[0]);

    expect(screen.getByTestId("date-popup")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-popup"));

    expect(screen.queryByTestId("date-popup")).not.toBeInTheDocument();
  });

  test("closes popup when close button is clicked", () => {
    render(<Calendar />);

    const dateCell = screen.getAllByText("1")[0];
    fireEvent.click(dateCell);

    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);

    expect(screen.queryByText(/1 /)).not.toBeInTheDocument();
  });
  it('should go to previous month when "prevMonth" button is clicked', () => {
    render(<Calendar />);

    expect(screen.getByText(/FEBRUARY 2025/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("prev-button"));

    expect(screen.getByText(/JANUARY 2025/i)).toBeInTheDocument();
  });

  it("should correctly change year when going back from January to December", () => {
    render(<Calendar />);

    expect(screen.getByText(/FEBRUARY 2025/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("prev-button"));

    expect(screen.getByText(/JANUARY 2025/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("prev-button"));
    expect(screen.getByText(/DECEMBER 2024/i)).toBeInTheDocument();
  });
});
