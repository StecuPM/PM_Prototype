import { test, expect } from '@playwright/test';


test.describe('ExploreCapmusTests - Access and Visibility', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
        await page.fill('#loginPassword', 'password123');
        await page.click('text=🚀 Enter Metaverse Platform');
    });

    test('Lectures section is visible', async ({ page }) => {
        await expect(page.getByText('🏛️ Explore Campus Discover')).toBeVisible();

    });

    test('can join a lecture', async ({ page }) => {
        await page.getByText('🏛️ Explore Campus Discover').click();
        await page.getByRole('button', { name: '🥽 Start Campus Tour' }).click();
        await expect(page.getByText('✅ Campus exploration ready!')).toBeVisible({ timeout: 10000 });
    });
});


test.describe('ExploreCampus - inside', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://192.168.1.3:8080/');
        await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
        await page.fill('#loginPassword', 'password123');
        await page.click('text=🚀 Enter Metaverse Platform');


        await page.getByText('🏛️ Explore Campus Discover').click();
        await page.getByRole('button', { name: '🥽 Start Campus Tour' }).click();
        await expect(page.getByText('✅ Campus exploration ready!')).toBeVisible({ timeout: 10000 });
    });

    test('you can visit place', async ({ page }) => {
        await page.getByText('⚙️ Engineering Labs').click();
        await expect(page.getByText('📍 ⚙️ Engineering Labs Advanced engineering facilities with specialized')).toBeVisible();
        await page.getByRole('button', { name: '🔍 Explore This Area' }).click();
    });
    test('you can leave explore', async ({ page }) => {
        await page.locator('#campusModal').getByText('×').click();
        await expect(page.getByText('🌐 VR Education Platform Immersive Learning Experience - DREAMTEAM Project JK')).toBeVisible();


    });
    test('you get exploration progress', async ({ page }) => {
        await expect(page.getByText('📊 Exploration Progress: 6/10')).toBeVisible();
        await page.getByText('⚙️ Engineering Labs').click();
        await page.getByText('🎨 Art Gallery').click();
        await expect(page.getByText('📊 Exploration Progress: 8/10')).toBeVisible();

    });
    test('you can visit all spaces', async ({ page }) => {
        await page.getByText('⚙️ Engineering Labs').click();
        await page.getByText('🎨 Art Gallery').click();
        await expect(page.getByText('📊 Exploration Progress: 8/10')).toBeVisible();
        await page.getByText('🏥 Medical Center').click();
        await page.locator('#campusMapSection').getByText('📚 Main Library').click();
        await page.getByText('🏢 Administration', { exact: true }).click();
        await page.getByText('🍽️ Cafeteria').click();
        await page.getByText('👥 Student Union').click();
        await page.locator('#campusMapSection').getByText('🏠 Dormitory').click();
        await expect(page.getByText('📊 Exploration Progress: 10/')).toBeVisible();
    });


});
