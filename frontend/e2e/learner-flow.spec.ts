import { expect, test } from '@playwright/test'

test('learner can navigate key routes', async ({ page }) => {
  await page.goto('/aice')
  await page.getByRole('link', { name: '내 플랜' }).click()
  await expect(page.getByText(/내 플랜/)).toBeVisible()

  await page.getByRole('link', { name: '실습 Labs' }).click()
  await expect(page.getByText('Full Pipeline: 회귀 기본 세트')).toBeVisible()

  await page.getByRole('link', { name: '실수 교정' }).click()
  await expect(page.getByText(/ANSWER_VAR_MISSING/)).toBeVisible()
})
