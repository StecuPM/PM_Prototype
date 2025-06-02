import { test, expect } from '@playwright/test';


test.describe('LectureTests - Access and Visibility', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
        await page.fill('#loginPassword', 'password123');
        await page.click('text=🚀 Enter Metaverse Platform');
    });

    test('Lectures section is visible', async ({ page }) => {
        await expect(page.getByText('🎓 Virtual Lectures Advanced')).toBeVisible();
    });

    test('can join a lecture', async ({ page }) => {
        await page.getByText('🎓 Virtual Lectures Advanced').click();
        await page.getByRole('button', { name: '🥽 Enter VR Lecture Hall' }).click();
        await expect(page.getByText('✅ Successfully joined VR')).toBeVisible({ timeout: 10000 });
    });
});


test.describe('LectureTests - Inside Lecture Hall', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#loginUsername', 'jan.kowalski@student.put.poznan.pl');
        await page.fill('#loginPassword', 'password123');
        await page.click('text=🚀 Enter Metaverse Platform');


        await page.getByText('🎓 Virtual Lectures Advanced').click();
        await page.getByRole('button', { name: '🥽 Enter VR Lecture Hall' }).click();
        await expect(page.getByText('✅ Successfully joined VR')).toBeVisible({ timeout: 10000 });
    });

    test('attendance is recorded', async ({ page }) => {
        await expect(page.getByRole('heading', { name: '✅ Attendance Recorded' })).toBeVisible();
    });

    test('you can mute/unmute during a lecture', async ({ page }) => {
        await expect(page.getByRole('button', { name: '🎤 Unmute Microphone' })).toBeVisible();
        await page.getByRole('button', { name: '🎤 Unmute Microphone' }).click();
        await expect(page.getByRole('button', { name: '🔇 Mute Microphone' })).toBeVisible();
        await page.getByRole('button', { name: '🔇 Mute Microphone' }).click();
        await expect(page.getByRole('button', { name: '🎤 Unmute Microphone' })).toBeVisible();
    });
    test('you can raise interacte on lecture', async ({ page }) => {
        await expect(page.getByRole('button', { name: '✏️ Pen' })).toBeVisible();
        await page.getByRole('button', { name: '✏️ Pen' }).click();
        await expect(page.getByText('✏️ Drawing with pen tool...')).toBeVisible();
        await page.getByRole('button', { name: '📝 Text' }).click();
        await expect(page.getByText('📝 Adding text annotation...')).toBeVisible();
    });
    test('lecture have atendance list', async ({ page }) => {
        await expect(page.getByText('Prof. Johnson (Lecturer)')).toBeVisible();
        await expect(page.getByText('Anna K.')).toBeVisible();
        await expect(page.getByText('Tomasz P.')).toBeVisible();
        await expect(page.getByText('+23 others')).toBeVisible();
    });
    test('you can give feedback after lecture', async ({ page }) => {
        await expect(page.getByText('📝 Lecture Feedback')).toBeVisible({ timeout: 15000 });
        await page.getByText('⭐').nth(3).click();
        await page.getByRole('textbox', { name: 'Additional comments...' }).click();
        await page.getByRole('textbox', { name: 'Additional comments...' }).fill('Super lekcja');
        await page.getByRole('button', { name: 'Submit Feedback' }).click();
        await expect(page.getByText('🌐 VR Education Platform Immersive Learning Experience - DREAMTEAM Project JK')).toBeVisible();
    });
    test('you can leave lecture', async ({ page }) => {
        await page.locator('#lecturesModal').getByText('×').click();
        await expect(page.getByText('🌐 VR Education Platform Immersive Learning Experience - DREAMTEAM Project JK')).toBeVisible();
    });
    test('user status is updated', async ({ page }) => {
        await page.locator('#lecturesModal').getByText('×').click();
        await expect(page.getByText('🔵 In VR Lecture')).toBeVisible();
        await page.getByText('🎓 Virtual Lectures Advanced').click();
        await page.locator('#lecturesModal').getByText('×').click();
        await expect(page.getByText('🟢 Online')).toBeVisible({ timeout: 10000 });
    });

});
