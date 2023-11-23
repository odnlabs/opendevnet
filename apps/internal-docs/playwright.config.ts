/* eslint-disable import/no-extraneous-dependencies */
import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

/**
 * LINK: https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './e2e' }),
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : 0,
  reporter: [
    ['html', { outputFolder: '../../dist/apps/website/playwright-report' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL:
      process.env.PUBLIC_INTERNAL_DOCS_URL ||
      'http://localhost:4200/internal-docs',
    trace: 'on-first-retry',
  },
  /* Run local dev server before starting the tests */
  webServer: {
    command: 'dotenv -e .env.local -- nx run internal-docs:dev',
    url: 'http://localhost:4200/internal-docs',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  }, // Configure projects for major browsers
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
    // Test against mobile viewports.
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    // Test against branded browsers.
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
