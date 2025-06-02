import { test, expect } from '@playwright/test';


test.describe('VirtualLab - Access and Visibility', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
        await page.fill('#loginPassword', 'password123');
        await page.click('text=🚀 Enter Metaverse Platform');
    });

    test('Virtual labs section is visible', async ({ page }) => {
        await expect(page.getByText('🔬 Virtual Labs Chemistry Lab')).toBeVisible();
    });

    test('can join a virtual lab', async ({ page }) => {
        await page.getByText('🔬 Virtual Labs Chemistry Lab').click();
        await page.getByRole('button', { name: '🥽 Enter Virtual Lab' }).click();
        await expect(page.getByText('✅ Virtual lab ready for')).toBeVisible({ timeout: 10000 });
    });
});


test.describe('VirtualLab - Inside ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
        await page.fill('#loginPassword', 'password123');
        await page.click('text=🚀 Enter Metaverse Platform');


        await page.getByText('🔬 Virtual Labs Chemistry Lab').click();
        await page.getByRole('button', { name: '🥽 Enter Virtual Lab' }).click();
        await expect(page.getByText('✅ Virtual lab ready for')).toBeVisible({ timeout: 10000 });
    });

    test('lab is working property', async ({ page }) => {
        await page.getByText('🧪 Burette').click();
        await page.getByRole('button', { name: '✅ Validate Action' }).click();
        await expect(page.getByText('✅ Set up titration apparatus')).toBeVisible();
        await page.getByText('🧪 Burette').click();
        await page.getByRole('button', { name: '✅ Validate Action' }).click();
        await expect(page.getByText('✅ Prepare standard solution')).toBeVisible();
        await page.getByText('🔬 Pipette').click();
        await page.getByRole('button', { name: '✅ Validate Action' }).click();
        await expect(page.getByText('✅ Add indicator to sample')).toBeVisible();
        await page.getByText('🧪 Burette').click();
        await page.getByRole('button', { name: '✅ Validate Action' }).click();
        await expect(page.getByText('✅ Perform titration')).toBeVisible();
        await page.getByText('📊 pH Meter').click();
        await page.getByRole('button', { name: '✅ Validate Action' }).click();
        await expect(page.getByText('✅ Record results and calculate')).toBeVisible();
    });
    test('you can leave lab', async ({ page }) => {
        await page.locator('#labsModal').getByText('×').click();
        await expect(page.getByText('🌐 VR Education Platform Immersive Learning Experience - DREAMTEAM Project JK')).toBeVisible();

    });
    test('you pick wrong tool', async ({ page }) => {
        await page.getByText('🔬 Pipette').click();
        await page.getByRole('button', { name: '✅ Validate Action' }).click();
        await expect(page.getByText('⏳ Set up titration apparatus')).toBeVisible();
    });




});
