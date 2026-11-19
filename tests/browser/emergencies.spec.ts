import { test, expect } from '@playwright/test';

test('city emergencies follow the viewed timeline, dismiss once and inspect explicitly', async ({ page }, info) => {
  const mobile = info.project.name === 'mobile';
  await page.setViewportSize(mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 });
  await page.goto('./simulation.html');
  await expect(page.locator('canvas')).toBeVisible({ timeout: 20000 });
  await page.getByRole('button', { name: 'Crisis', exact: true }).click();
  await page.getByRole('button', { name: 'Start crisis' }).click();
  const slider = page.getByRole('slider', { name: 'Simulation timeline' });
  const panel = page.getByRole('region', { name: 'City emergencies' });
  const inspector = page.getByRole('region', { name: 'Building inspection' });
  await slider.fill('4');
  await expect(panel.getByRole('heading', { name: 'Communications lost' })).toBeVisible();
  await expect(panel.getByText(/switched to manual dispatch/)).toBeVisible();
  await expect(inspector).toHaveCount(0);
  if (mobile) await page.getByRole('link', { name: 'Incidents · 2' }).click();
  await panel.scrollIntoViewIfNeeded();
  await page.screenshot({ path: info.outputPath('incident.png'), scale: 'css' });

  await panel.getByRole('button', { name: 'Inspect Meridian telecom' }).click();
  await expect(inspector.getByRole('heading', { name: 'Meridian telecom' })).toBeVisible();
  await panel.getByRole('button', { name: 'Dismiss' }).click();
  await expect(panel.getByText('Incident history · 2')).toBeFocused();
  await slider.press('Home');
  await expect(panel).toHaveCount(0);
  await slider.fill('4.25');
  await expect(panel.getByText('Incident history · 2')).toBeVisible();
  await expect(panel.getByRole('heading', { name: 'Communications lost' })).toHaveCount(0);
  await inspector.getByRole('button', { name: 'Send backup supplies' }).click();
  await expect(panel.getByText('04:15 · Service recovery')).toBeVisible();
  await panel.getByText('Incident history · 4').click();
  await expect(panel.getByText('Meridian telecom recovered', { exact: true })).toBeVisible();
  await expect(panel.getByText('East delivery hub improved', { exact: true }).last()).toBeVisible();
  await page.getByRole('button', { name: 'Investigation', exact: true }).click();
  await page.getByRole('dialog', { name: 'Switch to Investigation?' }).getByRole('button', { name: 'Start new experiment' }).click();
  await expect(panel).toHaveCount(0);
});
