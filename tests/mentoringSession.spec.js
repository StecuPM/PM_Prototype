import { test, expect } from '@playwright/test';


test.describe('MentoringSessionTests - Access and Visibility', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
        await page.fill('#loginPassword', 'password123');
        await page.click('text=🚀 Enter Metaverse Platform');
    });

    test('Mentoring section is visible', async ({ page }) => {
        await expect(page.getByText('🎯 Mentoring Career Guidance')).toBeVisible();

    });

    test('can join a mentoring session', async ({ page }) => {
        await page.getByText('🎯 Mentoring Career Guidance').click();
        await expect(page.getByText('Career Guidance with Dr. Smith 🏢 Private Mentoring Room Interactive whiteboard')).toBeVisible();
        await page.getByRole('button', { name: '🥽 Join Mentoring Session' }).click();
    });
});


test.describe('SocialSpaces - inside', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
        await page.fill('#loginPassword', 'password123');
        await page.click('text=🚀 Enter Metaverse Platform');

    });

    test('mentoring session is updated after participantens', async ({ page }) => {
        await expect(page.getByText('Scheduled')).toBeVisible();
        await page.getByText('🎯 Mentoring Career Guidance').click();
        await page.getByRole('button', { name: '🥽 Join Mentoring Session' }).click();
        await expect(page.locator('#mentoringSessionLi')).toBeVisible();
    });
    test('you can leave mentoring session', async ({ page }) => {
        await page.getByText('🎯 Mentoring Career Guidance').click();
        await page.locator('#mentoringModal').getByText('×').click();
        await expect(page.getByText('🌐 VR Education Platform Immersive Learning Experience - DREAMTEAM Project JK')).toBeVisible();
    });

});
