import {defineConfig,devices} from '@playwright/test';

export default defineConfig({
  testDir: './tests/deployment',
  timeout: 60000,
  use: {baseURL: 'http://127.0.0.1:4174/',trace: 'retain-on-failure'},
  webServer: {
    command: 'npm run preview -- --mode embarko --port 4174 --strictPort',
    url: 'http://127.0.0.1:4174/',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {name: 'desktop',use: {...devices['Desktop Chrome']}},
    {name: 'mobile',use: {...devices['iPhone 13'],browserName: 'chromium'}},
  ],
});
