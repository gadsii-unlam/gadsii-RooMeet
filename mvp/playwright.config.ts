import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'html',
  use: { baseURL: 'http://127.0.0.1:4174', trace: 'on-first-retry' },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4174',
    port: 4174,
    reuseExistingServer: false,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], ...(process.env.PLAYWRIGHT_USE_CHROME ? { channel: 'chrome' as const } : {}) } },
    { name: 'mobile-390', use: { ...devices['Desktop Chrome'], ...(process.env.PLAYWRIGHT_USE_CHROME ? { channel: 'chrome' as const } : {}), viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true } },
  ],
})
