import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the corresponding .env file based on NODE_ENV
dotenv.config({
  path: path.resolve(__dirname, '.env', `.env.${process.env.NODE_ENV || 'testing'}`),
});

// Define paths for BDD features and step definitions
const bddConfig = defineBddConfig({
  features: 'bdd/features/*.feature',
  steps: 'bdd/steps/*.ts',
});

export default defineConfig({
  testDir: './e2e',

  projects: [
    // Setup project: prepares baseURL and loading state for other tests
    {
      name: 'setup',
      use: {
        baseURL: process.env.BASE_URL,
      },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'classic',
      // Use prepared auth state and emulate mobile device settings
      use: {
        storageState: './.auth/user.json', // Pre-authenticated state
        locale: 'en-GB', // User locale
        timezoneId: 'Europe/London', // User timezone
        ...devices['iPhone 14 Pro'], // Emulate iPhone 14 Pro
        baseURL: process.env.BASE_URL, // Read base URL from environment
      },
      dependencies: ['setup'],
    },
    {
      name: 'bdd',
      // Point to BDD test directory and match patterns
      testDir: bddConfig,
      use: {
        locale: 'en-GB',
        timezoneId: 'Europe/London',
        ...devices['iPhone 14 Pro'],
      },
    },
  ],
  reporter: [
    ['html'], // Default HTML reporter
    cucumberReporter('html', {
      outputFile: 'cucumber-report/index.html',
      externalAttachments: true,
    }),
  ],
  use: {
    screenshot: 'on', // Capture screenshots on failure
    trace: 'on', // Collect trace every time
  },
});
