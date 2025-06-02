import { test, expect } from '@playwright/test';

test.describe('VR Education Platform - Business Flow Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://192.168.1.3:8080/');
  });

  test('Successful login shows dashboard and user info', async ({ page }) => {
    await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
    await page.fill('#loginPassword', 'password123');
    await page.click('text=🚀 Enter Metaverse Platform');

    await expect(page.locator('#userName')).toContainText('Jan Kowalski');
    await expect(page.locator('#userRole')).toContainText('Computer Science Student • Year 2');
  });

  test('Failed login does not show dashboard', async ({ page }) => {
    await page.fill('#loginUsername', 'wrong@example.com');
    await page.fill('#loginPassword', 'wrongpassword');
    await page.click('text=🚀 Enter Metaverse Platform');

    await expect(page.locator('#loginScreen')).toBeVisible();
  });

  test('Cards are visible after login', async ({ page }) => {
    await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
    await page.fill('#loginPassword', 'password123');
    await page.getByRole('button', { name: '🚀 Enter Metaverse Platform' }).click();

    await expect(page.getByText('🎓 Virtual Lectures Advanced')).toBeVisible();
    await expect(page.getByText('🔬 Virtual Labs Chemistry Lab')).toBeVisible();
    await expect(page.getByText('🏛️ Explore Campus Discover')).toBeVisible();
    await expect(page.getByText('👥 Social Spaces Study Café')).toBeVisible();
    await expect(page.getByText('🎯 Mentoring Career Guidance')).toBeVisible();
    await expect(page.getByText('📈 Orientation Progress 8/10')).toBeVisible();
  });

});
