import { expect, test } from '@playwright/test';

test('mode changes protect decisions, evidence, mission state and the saved experiment', async ({ page }) => {
  await page.goto('./simulation.html');
  const modes = page.getByRole('navigation', { name: 'Game mode' });
  const mode = (name: string) => modes.getByRole('button', { name, exact: true });
  const timeline = page.getByRole('slider', { name: 'Simulation timeline' });
  const inspector = page.getByRole('region', { name: 'Building inspection' });
  const dialogs = page.getByRole('dialog');
  const save = () => page.evaluate(() => localStorage.getItem('ctrl-z:experiment:v1'));
  const pick = (id: string) => page.locator(`[data-system="${id}"]`).click();
  const startNew = (name: string) => page.getByRole('dialog', { name: `Switch to ${name}?` })
    .getByRole('button', { name: 'Start new experiment' }).click();

  await page.getByRole('button', { name: 'Remove electricity', exact: true }).click();
  await page.getByRole('button', { name: 'Pause simulation' }).click();
  await timeline.fill('7');
  await pick('water');
  await inspector.getByRole('button', { name: 'Send backup supplies' }).click();
  await page.getByRole('button', { name: 'Save experiment' }).click();
  const saved = await save();
  expect(saved).toBeTruthy();

  await mode('Sandbox').click();
  await expect(dialogs).toHaveCount(0);
  await expect(timeline).toHaveValue('7');
  await expect(inspector.getByRole('heading', { name: 'Waterworks' })).toBeVisible();
  await expect(inspector.getByRole('button', { name: 'Supplies delivered' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Compare Futures', exact: true })).toBeVisible();

  await mode('Investigation').click();
  const confirm = page.getByRole('dialog', { name: 'Switch to Investigation?' });
  await expect(confirm.getByRole('button', { name: 'Cancel' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(confirm).toHaveCount(0);
  await expect(mode('Investigation')).toBeFocused();
  await expect(mode('Sandbox')).toHaveAttribute('aria-pressed', 'true');
  await expect(timeline).toHaveValue('7');
  await expect(inspector.getByRole('heading', { name: 'Waterworks' })).toBeVisible();
  await expect(inspector.getByRole('button', { name: 'Supplies delivered' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Compare Futures', exact: true })).toBeVisible();
  expect(await save()).toBe(saved);

  await mode('Investigation').click();
  await startNew('Investigation');
  await expect(mode('Investigation')).toHaveAttribute('aria-pressed', 'true');
  await expect(timeline).toHaveValue('5');
  await pick('telecom');
  await inspector.getByRole('button', { name: 'Record evidence' }).click();
  await timeline.fill('8');
  await mode('Investigation').click();
  await expect(dialogs).toHaveCount(0);
  await expect(timeline).toHaveValue('8');
  await expect(page.getByText(/Meridian telecom at 5.0h/)).toBeVisible();
  await expect(inspector.getByRole('heading', { name: 'Meridian telecom' })).toBeVisible();

  await mode('Crisis').click();
  await page.getByRole('dialog', { name: 'Switch to Crisis?' }).getByRole('button', { name: 'Cancel' }).click();
  await expect(timeline).toHaveValue('8');
  await mode('Crisis').click();
  await startNew('Crisis');
  await expect(mode('Crisis')).toHaveAttribute('aria-pressed', 'true');
  await expect(timeline).toBeDisabled();
  await mode('Crisis').click();
  await expect(dialogs).toHaveCount(0);
  await page.getByRole('button', { name: 'Start crisis' }).click();
  await timeline.fill('4');
  await pick('water');
  await inspector.getByRole('button', { name: 'Send backup supplies' }).click();
  await mode('Crisis').click();
  await expect(dialogs).toHaveCount(0);
  await expect(timeline).toHaveValue('4');
  await expect(timeline).toHaveAttribute('max', '12');
  await expect(page.getByText('1/2 teams', { exact: true })).toBeVisible();
  await expect(inspector.getByRole('heading', { name: 'Waterworks' })).toBeVisible();

  await mode('Sandbox').click();
  await startNew('Sandbox');
  await expect(timeline).toBeDisabled();
  expect(await save()).toBe(saved);
  await page.getByRole('button', { name: 'Resume saved' }).click();
  await expect(timeline).toHaveValue('7');
  await page.getByRole('button', { name: 'Reset experiment' }).click();
  await expect(timeline).toBeDisabled();
  expect(await save()).toBe(saved);
});
