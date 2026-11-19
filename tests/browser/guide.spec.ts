import { expect, test } from '@playwright/test';

test('the visible optional guide compares a real Sandbox intervention and preserves the save', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./simulation.html');
  await expect(page.locator('canvas')).toBeVisible({ timeout: 20000 });

  const launcher = page.getByRole('button', { name: 'Guided experiment', exact: true });
  const guide = page.getByRole('region', { name: 'Guided experiment' });
  const timeline = page.getByRole('slider', { name: 'Simulation timeline' });
  const inspector = page.getByRole('region', { name: 'Building inspection' });
  await expect(launcher).toBeVisible();
  await expect(guide).toHaveCount(0);
  await launcher.click();
  await guide.getByRole('button', { name: 'Start Sandbox outage' }).click();
  await expect(timeline).toHaveValue('0');

  await guide.getByRole('button', { name: 'Inspect Waterworks at 07:00' }).click();
  await expect(timeline).toHaveValue('7');
  await expect(inspector.getByRole('heading', { name: 'Waterworks' })).toBeVisible();
  await expect(guide.getByText(/offline North substation/)).toBeVisible();
  await guide.getByRole('button', { name: 'Observe original at 12:00' }).click();
  await expect(timeline).toHaveValue('12');
  await guide.getByRole('button', { name: 'Rewind to 05:00' }).click();
  await expect(timeline).toHaveValue('5');
  await guide.getByRole('button', { name: 'Send supplies to Waterworks' }).click();
  await expect(inspector.getByRole('button', { name: 'Supplies delivered' })).toBeDisabled();
  await guide.getByRole('button', { name: 'Compare at 12:00' }).click();

  const comparison = page.getByRole('region', { name: 'Compare Futures' });
  await expect(comparison.getByRole('slider', { name: 'Comparison preview' })).toHaveValue('12');
  await expect(comparison.getByText(/Citywide: \+6\.0 service-hours/)).toBeVisible();
  await expect(guide.getByText(/preserved 6\.0 more city service-hours/)).toBeVisible();
  await expect(timeline).toHaveValue('5');
  await guide.getByRole('button', { name: 'Collapse guide' }).click();
  await expect(guide.getByRole('button', { name: 'Expand guide' })).toHaveAttribute('aria-expanded', 'false');
  await expect(guide.getByRole('button', { name: 'Restart guide' })).toBeHidden();
  await expect(guide.getByText(/preserved 6\.0 more city service-hours/)).toBeVisible();
  await expect(comparison.getByRole('slider', { name: 'Comparison preview' })).toHaveValue('12');
  await guide.getByRole('button', { name: 'Expand guide' }).click();
  await comparison.getByRole('button', { name: 'Close comparison' }).click();

  await page.getByRole('button', { name: 'Save experiment' }).click();
  const saved = await page.evaluate(() => localStorage.getItem('ctrl-z:experiment:v1'));
  expect(saved).toBeTruthy();
  await guide.getByRole('button', { name: 'Restart guide' }).click();
  await expect(guide.getByText(/Starting replaces the current run/)).toBeVisible();
  await expect(timeline).toHaveValue('5');
  await guide.getByRole('button', { name: 'Cancel restart' }).click();
  await guide.getByRole('button', { name: 'Finish guide' }).click();

  await launcher.click();
  await expect(guide.getByText(/new outage replaces the current run/)).toBeVisible();
  await guide.getByRole('button', { name: 'Skip guide' }).click();
  await expect(timeline).toHaveValue('5');
  await launcher.click();
  await guide.getByRole('button', { name: 'Start new Sandbox outage' }).click();
  await expect(timeline).toHaveValue('0');
  expect(await page.evaluate(() => localStorage.getItem('ctrl-z:experiment:v1'))).toBe(saved);

  await page.getByRole('button', { name: 'Resume saved' }).click();
  await expect(timeline).toHaveValue('5');
});
