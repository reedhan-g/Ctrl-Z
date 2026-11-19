import { expect, test } from '@playwright/test';

test('Help follows the selected mode before and after a Crisis starts', async ({ page }) => {
  await page.goto('./simulation.html?mode=crisis');
  const modes = page.getByRole('navigation', { name: 'Game mode' });
  const help = page.getByRole('dialog', { name: 'How to play' });
  const openHelp = page.getByRole('button', { name: 'How to play' });
  const closeHelp = help.getByRole('button', { name: 'Close help' });

  await expect(modes.getByRole('button', { name: 'Crisis' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'Start crisis' })).toBeVisible();
  await openHelp.click();
  await expect(help.getByRole('heading', { name: 'Meridian Blackout help' })).toBeVisible();
  for (const rule of [/12 simulated hours/, /two supply teams/, /36 of 60 service-hours/, /3 services active/, /Manual grid restoration is unavailable/]) {
    await expect(help.getByText(rule)).toBeVisible();
  }
  await expect(help.getByRole('heading', { name: 'Shared controls' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(openHelp).toBeFocused();
  await page.getByRole('button', { name: 'Start crisis' }).click();
  await openHelp.click();
  await expect(help.getByText(/Manual grid restoration is unavailable/)).toBeVisible();
  await closeHelp.click();

  await modes.getByRole('button', { name: 'Sandbox' }).click();
  await openHelp.click();
  await expect(help.getByRole('heading', { name: 'Sandbox help' })).toBeVisible();
  await expect(help.getByText(/Use Restore electricity to manually reconnect/)).toBeVisible();
  await closeHelp.click();

  await modes.getByRole('button', { name: 'Investigation' }).click();
  await openHelp.click();
  await expect(help.getByRole('heading', { name: 'Investigation help' })).toBeVisible();
  await expect(help.getByText(/record their readings, then test your diagnosis/)).toBeVisible();
  await expect(help.getByText(/check whether the affected service recovers/)).toBeVisible();
});
