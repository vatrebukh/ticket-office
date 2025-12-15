import { test, expect } from '@playwright/test';

test('User is able to open home page and see two options: bus and train', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/');

  // Wait for the page to load and check for the welcome message
  await expect(page.locator('text=What are you looking for?')).toBeVisible();

  // Check that both bus and train options are visible
  await expect(page.locator('text=Travel by bus')).toBeVisible();
  await expect(page.locator('text=Travel by train')).toBeVisible();

  // Verify that there are exactly two service options
  const serviceOptions = page.locator('.service');
  await expect(serviceOptions).toHaveCount(2);

  // Verify the links are present and correct (scoped to service menu to avoid navigation links)
  await expect(page.locator('#service-menu a[href="/tickets/bus"]')).toBeVisible();
  await expect(page.locator('#service-menu a[href="/tickets/train"]')).toBeVisible();
});

