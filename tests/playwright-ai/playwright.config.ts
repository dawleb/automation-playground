import { defineConfig, devices } from '@playwright/test';

const BASE_URL = 'https://testing.byst.re/'
const USERNAME = '1@1.com'
const PASSWORD = '2!'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  // use: {
  //   headless: false,
  //   viewport: { width: 1280, height: 720 },
  //   ignoreHTTPSErrors: true,
  //   baseURL: 'https://testing.byst.re/',
  // },
  projects: [
        // 👇 Setup project to execute before others
    {
      name: 'setup',
      use: {
        baseURL: BASE_URL,
        // httpCredentials: {
        //   username: USERNAME,
        //   password: PASSWORD,
        // },
      },
      testMatch: /.*\.setup\.ts/,
    },
    { 
      name: 'Mobile Safari',
      use: {
        // 👇 Pre-authenticated state
        storageState: './.auth/user.json',
        // Emulates the user locale.
        locale: 'en-GB',
        // Emulates the user timezone.
        timezoneId: 'Europe/London',
        // Emulates the user device.
        ...devices['iPhone 14 Pro'],
        // Read base url from environment variable.
        baseURL: BASE_URL,
      },
    },
  ],
});