import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'node:url';
export default defineConfig({
 testDir:'../tests/browser',fullyParallel:true,timeout:60000,
 use:{baseURL:'http://127.0.0.1:5173/Ctrl-Z/',trace:'retain-on-failure'},
 webServer:{
  cwd:fileURLToPath(new URL('../',import.meta.url)),
  command:'npm run dev -- --port 5173 --strictPort',
  url:'http://127.0.0.1:5173/Ctrl-Z/',
  reuseExistingServer:!process.env.CI,
 },
 projects:[{name:'desktop',use:{...devices['Desktop Chrome']}},{name:'mobile',use:{...devices['iPhone 13'],browserName:'chromium'}}]
});
