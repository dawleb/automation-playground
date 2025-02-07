import { test, expect } from '@playwright/test'

test('should successfully log in', async ({ page }) => {
  // Navigate to the page.
  await page.goto('#/login')

  // Provide user credentials.
  await page.fill('#email', 'student@example.com')
  await page.fill('#password', 'Test123!')

  // Click the login button.
  await page.click('#submit')

  // Expect a title and heading to contain a welcome message.
  await expect(page).toHaveURL(/welcome/)
  await expect(page.getByRole('heading', { name: 'Welcome!' })).toBeVisible()

  // Added logs:
  const timezone = await page.evaluate(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
  )
  const locale = await page.evaluate(() => navigator.language)
  const userAgent = await page.evaluate(() => navigator.userAgent)
  const screenSize = await page.evaluate(() => ({
    width: window.screen.width,
    height: window.screen.height,
  }))

  console.log(`Timezone: ${timezone}`)
  console.log(`Locale: ${locale}`)
  console.log(`User Agent: ${userAgent}`)
  console.log(`Screen Size: ${screenSize.width}x${screenSize.height}`)
})
