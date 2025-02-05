import { test, expect } from "@playwright/test";

test.describe("Calendar Test", () => {
  test("should load the calendar page", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page).toHaveTitle(/Full Calendar/);
  });

  test("should navigate to previous and next months", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const prevButton = page.getByTestId("prev-button");
    const nextButton = page.getByTestId("next-button");
    const monthText = page.getByTestId("month-text");

    const initialMonth = await monthText.innerText();

    await nextButton.click();
    await expect(monthText).not.toHaveText(initialMonth);

    await prevButton.click();
    await expect(monthText).toHaveText(initialMonth);
  });

  test("should switch between month and year views", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const yearViewButton = page.getByText("Year");
    const monthViewButton = page.getByText("Month");
    const yearView = page.getByTestId("year-view");
    const monthView = page.getByTestId("month-view");

    await yearViewButton.click();
    await expect(yearView).toBeVisible();

    await monthViewButton.click();
    await expect(monthView).toBeVisible();
  });

  test("should open and close the date popup", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const dateButton = page.locator("td:has-text('1')").first();
    const popup = page.getByTestId("date-popup");

    await dateButton.click();
    await expect(popup).toBeVisible();

    const closeButton = page.getByTestId("close-popup");
    await closeButton.click();
    await expect(popup).not.toBeVisible();
  });

  test("should close the popup when clicking outside", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const dateButton = page.locator("td:has-text('1')").first();
    const popup = page.getByTestId("date-popup");

    await dateButton.click();
    await expect(popup).toBeVisible();

    await page.locator("body").click();

    await expect(popup).not.toBeVisible();
  });

  test("should select a month in year view and switch to that month", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000");

    await page.getByText("Year").click();

    const monthName = "MARCH";
    const monthElement = page.getByText(monthName);

    await monthElement.click();
    await expect(page.getByTestId("month-text")).toHaveText(
      new RegExp(monthName, "i")
    );
  });

  test("should prevent selecting empty cells in the calendar", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000");

    const emptyCell = page.locator("td:has-text('')").first();
    const popup = page.getByTestId("date-popup");

    await emptyCell.click();
    await expect(popup).not.toBeVisible();
  });
});
