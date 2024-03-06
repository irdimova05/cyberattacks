import { test, expect } from '@playwright/test';

test('brute force attack', async ({ page }) => {
  await page.goto('/login');

  const email = page.getByTestId("email");
  const pass = page.getByTestId("pass");
  const loginButton = page.getByTestId("login");

  await email.fill("test@test.test");
  await pass.fill("testtest");
  await loginButton.click();

  await expect(page).toHaveURL("/dashboard");
});