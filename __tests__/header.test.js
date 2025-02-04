import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../src/components/Header";

describe("Header Component", () => {
  const mockChangeView = jest.fn();
  const mockGoToToday = jest.fn();
  const mockPrevMonth = jest.fn();
  const mockNextMonth = jest.fn();
  const mockGetMonthName = jest.fn().mockReturnValue("February");
  const mockSetSelectedYear = jest.fn();

  const selectedMonth = 1;
  const selectedYear = 2025;

  beforeEach(() => {
    render(
      <Header
        changeView={mockChangeView}
        goToToday={mockGoToToday}
        prevMonth={mockPrevMonth}
        nextMonth={mockNextMonth}
        getMonthName={mockGetMonthName}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={mockSetSelectedYear}
      />
    );
  });

  test("renders the header correctly", () => {
    expect(screen.getByText(/Full Calendar/i)).toBeInTheDocument();
    expect(screen.getByText(/February 2025/i)).toBeInTheDocument();
  });

  test("calls prevMonth when the left arrow is clicked", () => {
    fireEvent.click(screen.getByTestId("prev-button"));
    expect(mockPrevMonth).toHaveBeenCalledTimes(1);
  });

  test("calls nextMonth when the right arrow is clicked", () => {
    fireEvent.click(screen.getByTestId("next-button"));
    expect(mockNextMonth).toHaveBeenCalledTimes(1);
  });

  test("calls goToToday when the Today button is clicked", () => {
    fireEvent.click(screen.getByText(/Today/i));
    expect(mockGoToToday).toHaveBeenCalledTimes(1);
  });

  test('calls changeView with "year" when Year button is clicked', () => {
    fireEvent.click(screen.getByText(/Year/i));
    expect(mockChangeView).toHaveBeenCalledWith("year");
  });

  test('calls changeView with "month" when Month button is clicked', () => {
    fireEvent.click(screen.getByText(/Month/i));
    expect(mockChangeView).toHaveBeenCalledWith("month");
  });

  test("selecting a year calls setSelectedYear", () => {
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "2023" },
    });
    expect(mockSetSelectedYear).toHaveBeenCalledWith(2023);
  });
});
