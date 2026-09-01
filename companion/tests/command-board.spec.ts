import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders the clock and three command sectors", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Command clock" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Signals" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Impact" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Recovery" })).toBeVisible();
  await expect(page.getByText("SYNTHETIC DEMONSTRATION", { exact: false }).first()).toBeVisible();
});

test("evidence selection updates the inspector", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /^EV-01 SYNTHETIC/ }).click();
  await expect(page.getByText("Selected: EV-01 · OBSERVATION")).toBeVisible();
});

test("approval records synthetic authorization without enabling a public write", async ({ page }) => {
  await page.goto("/");
  const execute = page.getByRole("button", { name: "ServiceNow execution is disabled in the public demonstration" });
  await expect(execute).toBeDisabled();
  await page.getByRole("button", { name: "Approve exact action" }).click();
  await expect(page.getByText("SYNTHETIC AUTHORIZED")).toBeVisible();
  await expect(page.getByText("AUTHORIZED · NO WRITE")).toBeVisible();
  await expect(execute).toBeDisabled();
});

test("prompt injection disables approval and quarantines input", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Demonstrate a guarded state").selectOption("injection");
  await expect(page.getByText("INPUT QUARANTINED").first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Approve exact action" })).toBeDisabled();
});

test("has no automatically detectable WCAG A or AA violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
});

test("primary workflow is keyboard reachable", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to evidence sectors" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#sectors$/);
});
