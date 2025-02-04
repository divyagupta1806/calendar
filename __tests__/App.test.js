import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import Calendar from "../src/pages/Calendar";

jest.mock("../src/pages/Calendar", () =>
  jest.fn((props) => {
    console.log("Calendar mock called with props:", props);
    return <div>{JSON.stringify(props)}</div>;
  })
);

jest.mock("../src/components/Footer", () =>
  jest.fn(() => <div>Mocked Footer</div>)
);

describe("App Component", () => {
  test("renders Calendar and Footer components", () => {
    render(<App />);

    expect(screen.getByText("Mocked Footer")).toBeInTheDocument();
    expect(screen.getByText(/"view":"month"/)).toBeInTheDocument();
  });

  test("passes the correct props to Calendar", () => {
    render(<App />);

    expect(Calendar).toHaveBeenCalled();

    expect(Calendar.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        view: "month",
        selectedMonth: new Date().getMonth(),
        selectedYear: new Date().getFullYear(),
        setSelectedMonth: expect.any(Function),
        setSelectedYear: expect.any(Function),
      })
    );
  });
});
