import { expect, test } from '@playwright/test'

test('session page renders and submit button exists', async ({ page }) => {
  await page.goto('/aice/session/demo-001')
  await expect(page.getByRole('button', { name: '스텝 제출' })).toBeVisible()
})
