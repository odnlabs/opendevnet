/* eslint-disable import/no-extraneous-dependencies */
import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

const baseUrl = process.env.PUBLIC_WEBSITE_URL || 'http://localhost:4000';
const ci = process.env.ENVIRONMENT === 'ci';

/**
 * LINK: https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './e2e' }),
  timeout: 30_000,
  // Run all tests in parallel.
  fullyParallel: true,
  // Retry on CI only.
  retries: ci ? 2 : 0,
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!ci,
  // Opt out of parallel tests on CI.
  ...(ci ? { workers: 1 } : {}),
  // Generate a report after the test run.
  reporter: [
    ['html', { outputFolder: '../../dist/apps/website/playwright-report' }],
  ],
  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
  use: {
    headless: true,
    baseURL: baseUrl,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
  },
  // Run local dev server before starting the tests.
  webServer: {
    command: 'dotenv -e .env.local -- nx run website:dev',
    url: baseUrl,
    reuseExistingServer: ci,
    cwd: workspaceRoot,
    timeout: 30_000,
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile viewports.
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    // Branded browsers.
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
