import { defineConfig, devices } from '@playwright/test';
/* Configure projects for major browsers */ export default defineConfig({
  projects: [
    {
      name: 'Mobile Safari',
      use: {
        // Emulates the user locale.
        locale: 'en-GB',
        // Emulates the user timezone.
        timezoneId: 'Europe/London',
        // Emulates the user device.
        ...devices['iPhone 14 Pro'],
        // Adds base url
        baseURL: 'https://testing.byst.re/',
      },
    },
  ],
});