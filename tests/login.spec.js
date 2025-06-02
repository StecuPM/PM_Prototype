import { test, expect } from '@playwright/test';

test.describe('VR Education Platform - Business Flow Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://192.168.1.3:8080/'); // Zamień na prawidłowy adres
  });

  test('Successful login shows dashboard and user info', async ({ page }) => {
    await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
    await page.fill('#loginPassword', 'wpassword123');
    await page.click('text=🚀 Enter Metaverse Platform');

    await expect(page.locator('#mainApp')).toBeVisible();
    await expect(page.locator('#userName')).toContainText('Jan Kowalski');
    await expect(page.locator('#userRole')).toContainText('Computer Science Student • Year 2');
  });

  test('Failed login does not show dashboard', async ({ page }) => {
    await page.fill('#loginUsername', 'wrong@example.com');
    await page.fill('#loginPassword', 'wrongpassword');
    await page.click('text=🚀 Enter Metaverse Platform');

    await expect(page.locator('#mainApp')).toBeHidden();
    // Dodaj obsługę błędu w aplikacji: np. alert lub komunikat
  });

  test('Cards are visible after login', async ({ page }) => {
    await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
    await page.fill('#loginPassword', 'wpassword123');
    await page.click('text=🚀 Enter Metaverse Platform');

    await expect(page.locator('.card.lectures')).toBeVisible();
    await expect(page.locator('.card.labs')).toBeVisible();
    await expect(page.locator('.card.campus')).toBeVisible();
    await expect(page.locator('.card.social')).toBeVisible();
    await expect(page.locator('.card.mentoring')).toBeVisible();
    await expect(page.locator('.card.progress')).toBeVisible();
  });

});
