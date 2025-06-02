import { test, expect } from '@playwright/test';


test.describe('SocialSpacesTests - Access and Visibility', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
        await page.fill('#loginPassword', 'password123');
        await page.click('text=🚀 Enter Metaverse Platform');
    });

    test('Social spaces section is visible', async ({ page }) => {
        await expect(page.getByText('👥 Social Spaces Study Café')).toBeVisible();

    });

    test('can join a social space', async ({ page }) => {
        await page.getByText('👥 Social Spaces Study Café').click();
        await page.getByRole('button', { name: '🥽 Join Social VR Space' }).click();
        await expect(page.getByText('✅ Connected to social VR')).toBeVisible();
    });
});


test.describe('SocialSpaces - inside', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
        await page.fill('#loginPassword', 'password123');
        await page.click('text=🚀 Enter Metaverse Platform');


        await page.getByText('👥 Social Spaces Study Café').click();
        await page.getByRole('button', { name: '🥽 Join Social VR Space' }).click();
        await expect(page.getByText('✅ Connected to social VR')).toBeVisible();
    });

    test('space has participants', async ({ page }) => {
        await expect(page.getByText('Maria S.')).toBeVisible();
        await expect(page.getByText('Piotr K.')).toBeVisible();
        await expect(page.getByText('Elena M.')).toBeVisible();
        await expect(page.getByText('+9 others')).toBeVisible();
    });
    test('you can leave social spaces', async ({ page }) => {
        await page.locator('#socialModal').getByText('×').click();
        await expect(page.getByText('🌐 VR Education Platform Immersive Learning Experience - DREAMTEAM Project JK')).toBeVisible();
    });
    test('you can change between diferent chanels', async ({ page }) => {
        await page.getByText('🎮 Gaming Lounge Casual games').click();
        await expect(page.getByText('🏠 Entering 🎮 Gaming Lounge')).toBeVisible();
        await page.getByText('💬 Discussion Forum Academic').click();
        await expect(page.getByText('🏠 Entering 💬 Discussion')).toBeVisible();
    });
    test('you can mute and unmute voice and speakers', async ({ page }) => {
        await expect(page.getByRole('button', { name: '🎤 Mute Microphone' })).toBeVisible();
        await page.getByRole('button', { name: '🎤 Mute Microphone' }).click();
        await expect(page.getByRole('button', { name: '🔇 Microphone Muted' })).toBeVisible();
        await page.getByRole('button', { name: '🔇 Microphone Muted' }).click();
        await expect(page.getByRole('button', { name: '🎤 Mute Microphone' })).toBeVisible();
        await expect(page.getByRole('button', { name: '🔊 Mute Speaker' })).toBeVisible();
        await page.getByRole('button', { name: '🔊 Mute Speaker' }).click();
        await expect(page.getByRole('button', { name: '🔇 Speaker Muted' })).toBeVisible();
        await page.getByRole('button', { name: '🔇 Speaker Muted' }).click();
        await expect(page.getByRole('button', { name: '🔊 Mute Speaker' })).toBeVisible();
    });
    test('you can give reactions', async ({ page }) => {
        await page.getByRole('button', { name: '👍' }).click();
        await expect(page.getByText('Jan K. 👍')).toBeVisible();
        await page.getByRole('button', { name: '👏' }).click();
        await expect(page.getByText('Jan K. 👏')).toBeVisible();
    });


});
