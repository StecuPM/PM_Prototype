import { test, expect } from '@playwright/test';


test.describe('OrientationProgress - Access and Visibility', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
        await page.fill('#loginPassword', 'password123');
        await page.click('text=🚀 Enter Metaverse Platform');
    });

    test('Lectures section is visible', async ({ page }) => {
        await expect(page.getByText('📈 Orientation Progress 8/10')).toBeVisible();


    });

    test('can join a lecture', async ({ page }) => {
        await page.getByText('📈 Orientation Progress 8/10').click();
        await expect(page.getByText('× 📈 Orientation Progress')).toBeVisible();
    });
});


test.describe('OrienationProgres - Inside ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
        await page.fill('#loginPassword', 'password123');
        await page.click('text=🚀 Enter Metaverse Platform');


        await page.getByText('📈 Orientation Progress 8/10').click();
    });

    test('you get progress corectly', async ({ page }) => {
        await expect(page.getByText('📈 Orientation Progress 8/10')).toBeVisible();
        await page.locator('#progressModal').getByText('×').click();
        await page.getByText('🏛️ Explore Campus Discover').click();
        await page.getByRole('button', { name: '🥽 Start Campus Tour' }).click();
        await expect(page.getByText('✅ Campus exploration ready!')).toBeVisible({ timeout: 10000 });
        await page.getByText('⚙️ Engineering Labs').click();
        await page.getByText('🎨 Art Gallery').click();
        await page.getByText('🏥 Medical Center').click();
        await page.getByText('👥 Student Union').click();
        await page.locator('#campusModal').getByText('×').click();
        await expect(page.getByText('📈 Orientation Progress 9/10')).toBeVisible();

    });
    test('you can leave progress', async ({ page }) => {
        await page.locator('#progressModal').getByText('×').click();
        await expect(page.getByText('🌐 VR Education Platform Immersive Learning Experience - DREAMTEAM Project JK')).toBeVisible();
    });





});
