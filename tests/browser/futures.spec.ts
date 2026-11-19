import { test, expect } from '@playwright/test';

const entry = process.env.CTRL_Z_RELEASE_URL
  ? new URL('./simulation.html', process.env.CTRL_Z_RELEASE_URL).href
  : './simulation.html';

test('futures compare the same hour without seeking the city and can inspect or retry a response', async ({ page }, info) => {
  const mobile = info.project.name === 'mobile';
  await page.setViewportSize(mobile ? { width: 390, height: 844 } : { width: 1366, height: 768 });
  await page.goto(entry);
  await expect(page.locator('canvas')).toBeVisible({ timeout: 20000 });
  await page.getByRole('button', { name: 'Crisis', exact: true }).click();
  await page.getByRole('button', { name: 'Start crisis' }).click();
  await expect(page.getByRole('button', { name: 'Compare Futures' })).toHaveCount(0);
  const systems = page.getByRole('region', { name: 'City systems' });
  const inspector = page.getByRole('region', { name: 'Building inspection' });
  const live = page.getByRole('slider', { name: 'Simulation timeline' });
  await systems.getByRole('button', { name: /Waterworks/ }).click();
  await inspector.getByRole('button', { name: 'Send backup supplies' }).click();
  await live.fill('4.25');
  await systems.getByRole('button', { name: /Meridian telecom/ }).click();
  await inspector.getByRole('button', { name: 'Send backup supplies' }).click();
  await inspector.getByRole('button', { name: 'Close inspection' }).click();
  await live.press('End');
  await page.getByRole('button', { name: 'Save experiment' }).click();
  const savedJournal = await page.evaluate(() => localStorage.getItem('ctrl-z:experiment:v1'));
  expect(savedJournal).toBeTruthy();
  await page.getByRole('button', { name: 'View comparison' }).click();
  const panel = page.getByRole('region', { name: 'Compare Futures' });
  const time = panel.getByRole('slider', { name: 'Comparison preview' });
  await expect(page.getByText('Live experiment', { exact: true })).toBeVisible();
  await expect(time).toHaveValue('12');
  await expect(panel.getByRole('region', { name: 'Original outcome' })).toContainText('28.2');
  await expect(panel.getByRole('region', { name: 'Revised outcome' })).toContainText('43.3');
  await expect(panel.getByText('+15.1 service-hours vs. original through 12:00')).toBeVisible();
  const explanation = panel.getByText('What are service-hours?', { exact: true });
  await explanation.press('Enter');
  await expect(panel.getByText(/Partial capacity earns proportionally less/)).toBeVisible();
  await explanation.press('Enter');
  if (!mobile) {
    const liveBox = (await live.boundingBox())!;
    const comparisonBox = (await panel.boundingBox())!;
    expect(liveBox.x + liveBox.width).toBeLessThanOrEqual(comparisonBox.x);
    const scores = await panel.locator('.futures-score span').evaluateAll(labels => labels.map(label => {
      const range = document.createRange();
      range.selectNodeContents(label);
      return range.getClientRects().length;
    }));
    expect(scores).toEqual([1, 1]);
  }
  await panel.getByRole('button', { name: 'Back to timeline' }).click();
  await expect(live).toBeFocused();
  await panel.evaluate(node => node.scrollIntoView({ block: 'start' }));
  await page.screenshot({ path: info.outputPath('comparison.png'), scale: 'css' });
  await time.fill('4');
  await expect(panel.getByText('0.0 service-hours vs. original through 04:00')).toBeVisible();
  await expect(panel.getByText('Preview changes leave the live experiment at 12:00.')).toBeVisible();
  await expect(live).toHaveValue('12');
  await panel.getByRole('combobox', { name: 'Original response' }).selectOption('1');
  await panel.getByRole('button', { name: 'Close comparison' }).click();
  await expect(panel).toHaveCount(0);
  await page.getByRole('button', { name: 'View comparison' }).click();
  await expect(panel.getByRole('combobox', { name: 'Original response' })).toHaveValue('1');
  await expect(panel.getByRole('combobox', { name: 'Revised response' })).toHaveValue('0');
  await expect(time).toHaveValue('4');
  await time.fill('12');
  await expect(panel.getByText('-15.1 service-hours vs. original through 12:00')).toBeVisible();
  await panel.getByRole('combobox', { name: 'Original response' }).selectOption('0');
  await time.fill('10');
  await panel.getByRole('button', { name: 'Inspect Waterworks', exact: true }).click();
  await expect(inspector.getByText('Live experiment · 12:00', { exact: true })).toBeVisible();
  await expect(inspector.getByText('Comparison preview · 10:00', { exact: true })).toBeVisible();
  await expect(inspector.getByRole('region', { name: 'Facility comparison' })).toContainText('Offline · 0%');
  await expect(inspector.getByRole('region', { name: 'Facility comparison' })).toContainText('Backup power · 100%');
  await expect(live).toHaveValue('12');
  await page.getByRole('button', { name: 'Save experiment' }).click();
  expect(await page.evaluate(() => localStorage.getItem('ctrl-z:experiment:v1'))).toBe(savedJournal);
  await panel.getByRole('button', { name: 'Rewind and try a different response' }).click();
  await expect(live).toHaveValue('0');
  await expect(page.getByText('2/2 teams')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Compare Futures' })).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(1);
});

test('Sandbox comparison explains why the hospital fuel delivery gains no service at 24:00', async ({ page }) => {
  await page.goto(entry);
  await expect(page.locator('canvas')).toBeVisible({ timeout: 20000 });
  const live = page.getByRole('slider', { name: 'Simulation timeline' });
  const systems = page.getByRole('region', { name: 'City systems' });
  const inspector = page.getByRole('region', { name: 'Building inspection' });
  await page.getByRole('button', { name: 'Remove electricity', exact: true }).click();
  await page.getByRole('button', { name: 'Pause simulation' }).click();
  await live.fill('12');
  await systems.getByRole('button', { name: /St. Mira Hospital/ }).click();
  await inspector.getByRole('button', { name: 'Send backup supplies' }).click();
  await inspector.getByRole('button', { name: 'Close inspection' }).click();
  await live.press('End');
  await page.getByRole('button', { name: 'Compare Futures', exact: true }).click();

  const panel = page.getByRole('region', { name: 'Compare Futures' });
  const results = panel.getByRole('region', { name: 'Intervention results' });
  const time = panel.getByRole('slider', { name: 'Comparison preview' });
  await expect(results.getByText('Hospital service +0h through 24:00.')).toBeVisible();
  await expect(results.getByText(/Generator reserve \+8h at delivery/)).toBeVisible();
  await expect(results.getByText('The water buffer ran out at 18:00.')).toBeVisible();
  await results.getByRole('button', { name: 'Inspect Waterworks' }).click();
  await expect(inspector.getByRole('heading', { name: 'Waterworks', exact: true })).toBeVisible();
  await expect(live).toHaveValue('24');

  await time.fill('11.75');
  await expect(results).toHaveCount(0);
  await time.fill('17.75');
  await expect(results.getByText(/Generator reserve \+8h/)).toBeVisible();
  await expect(results.getByText(/water buffer ran out/)).toHaveCount(0);
  await time.fill('24');
  await panel.getByRole('combobox', { name: 'Original response' }).selectOption('1');
  await expect(results.getByText(/Original · 12:00/)).toBeVisible();
  await expect(live).toHaveValue('24');
});
