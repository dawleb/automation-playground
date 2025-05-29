import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from the ".env" file and set 'development' as default.
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '.env', `.env.${process.env.NODE_ENV || 'development'}`),
});

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // testDir: './e2e',
  // /* Run tests in files in parallel */
  // fullyParallel: true,
  // /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  // /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  // /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // use: {
  //   /* Base URL to use in actions like `await page.goto('/')`. */
  //   // baseURL: 'http://127.0.0.1:3000',

  //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  //   trace: 'on-first-retry',
  // },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    {
      name: 'setup',
      use: {
        baseURL: process.env.BASE_URL,
      },
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: 'Mobile Safari',
      use: {
        // Use prepared auth state.
        storageState: './.auth/user.json',

        // Emulates the user locale.
        locale: 'en-GB',

        // Emulates the user timezone.
        timezoneId: 'Europe/London',

        // Emulates the user device.
        ...devices['iPhone 14 Pro'],

        // Read base url from environment variable.
        baseURL: process.env.BASE_URL,
      },
      dependencies: ['setup'],
    },
    // {
    //   name: 'chromium',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     // It is important to define the `viewport` property after destructuring `devices`,
    //     // since devices also define the `viewport` for that device.
    //     viewport: { width: 1280, height: 720 },
    //       baseURL: 'https://testing.byst.re/',
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
