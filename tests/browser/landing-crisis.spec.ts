import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';

const save = readFileSync(new URL('../fixtures/save-v1-core.json', import.meta.url), 'utf-8');
const saveKey = 'ctrl-z:experiment:v1';

test('the landing opens a Crisis briefing and regular Play still opens Sandbox', async ({ page }, info) => {
  const phone = info.project.name === 'mobile';
  await page.setViewportSize(phone ? { width: 390, height: 844 } : { width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page.evaluate(([key, value]) => localStorage.setItem(key, value), [saveKey, save]);
  const witness = page.getByRole('link', { name: 'Witness the blackout' });
  const crisis = page.getByRole('link', { name: 'Play Crisis Mode' });
  await expect(crisis).toHaveAttribute('href', './simulation.html?mode=crisis');
  const previewBox = (await witness.boundingBox())!;
  const crisisBox = (await crisis.boundingBox())!;
  expect(crisisBox.height).toBeGreaterThanOrEqual(44);
  expect(crisisBox.y + crisisBox.height).toBeLessThanOrEqual(phone ? 844 : 900);
  if (phone) expect(crisisBox.y).toBeGreaterThanOrEqual(previewBox.y + previewBox.height);
  else expect(crisisBox.y).toBe(previewBox.y);
  await witness.click();
  await expect(page).toHaveURL(/#preview$/);
  await crisis.click();
  await expect(page).toHaveURL(/\/Ctrl-Z\/simulation\.html\?mode=crisis$/);
  await expect(page.getByRole('button', { name: 'Crisis', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('heading', { name: /Meridian Blackout/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start crisis' })).toBeEnabled();
  await expect(page.getByRole('slider', { name: 'Simulation timeline' })).toBeDisabled();
  expect(await page.evaluate(key => localStorage.getItem(key), saveKey)).toBe(save);

  await page.goto('./');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Play', exact: true }).click();
  await expect(page).toHaveURL(/\/Ctrl-Z\/simulation\.html$/);
  await expect(page.getByRole('button', { name: 'Sandbox', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'Remove electricity' })).toBeVisible();
});
