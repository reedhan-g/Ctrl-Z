import { expect, test, type Locator } from '@playwright/test';

async function tapRange(slider: Locator, fraction: number) {
  const box = (await slider.boundingBox())!;
  await slider.tap({ position: { x: Math.round(box.width * fraction), y: Math.round(box.height / 2) } });
}

for (const [width, height] of [[320, 700], [844, 390]]) {
  test(`Embarko touch release at ${width}x${height}`, async ({ page, isMobile }, info) => {
    test.skip(!isMobile, 'Touches are covered by the mobile Chromium profile');
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const landing = process.env.CTRL_Z_RELEASE_URL || './';
    await page.goto(landing);
    await page.getByRole('link', { name: 'Play Crisis Mode' }).tap();
    await expect(page.getByRole('button', { name: 'Start crisis' })).toBeVisible();
    await page.getByRole('button', { name: 'How to play' }).tap();
    await expect(page.getByRole('dialog').getByText(/Manual grid restoration is unavailable/)).toBeVisible();
    await page.getByRole('button', { name: 'Close help' }).tap();

    await page.goto(landing);
    await page.getByRole('link', { name: 'Play', exact: true }).tap();
    const host = page.locator('.city-canvas');
    await expect(host.locator('canvas')).toBeVisible({ timeout: 25000 });
    const timeline = page.getByRole('slider', { name: 'Simulation timeline' });
    await expect(timeline).toHaveAttribute('max', '24');
    await expect(page.getByRole('button', { name: 'Expand minimap' })).toBeVisible();

    const cdp = await page.context().newCDPSession(page);
    const touch = async (start: { id: number; x: number; y: number }[], end: typeof start) => {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: start });
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: end });
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    };
    await page.evaluate(() => scrollTo(0, 0));
    const premise = (await page.locator('.premise').boundingBox())!;
    const gestureY = Math.round(premise.y + premise.height - 6);
    await touch([{ id: 1, x: 55, y: gestureY }], [{ id: 1, x: 55, y: 7 }]);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);

    await host.scrollIntoViewIfNeeded();
    const scene = (await host.boundingBox())!;
    const x = Math.round(scene.x + scene.width / 2);
    const y = Math.round((Math.max(0, scene.y) + Math.min(height, scene.y + scene.height)) / 2);
    const camera = () => host.evaluate(node => JSON.parse((node as HTMLElement).dataset.camera!));
    const start = await camera();
    const scroll = await page.evaluate(() => scrollY);
    await touch([{ id: 1, x, y }], [{ id: 1, x: x + 40, y: y + 20 }]);
    await expect.poll(async () => (await camera()).pan.x).not.toBe(start.pan.x);
    expect(await page.evaluate(() => scrollY)).toBe(scroll);

    await touch([{ id: 1, x: x - 38, y }, { id: 2, x: x + 38, y }],
      [{ id: 1, x: x - 62, y }, { id: 2, x: x + 62, y }]);
    await expect.poll(async () => (await camera()).zoom).toBeGreaterThan(start.zoom);
    await cdp.detach();

    const lowPower = page.getByRole('button', { name: 'Low power mode' });
    await lowPower.tap();
    await expect(lowPower).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: 'Remove electricity', exact: true }).tap();
    await page.getByRole('button', { name: 'Pause simulation' }).tap();
    await tapRange(timeline, 0.5);
    const originalHour = Number(await timeline.inputValue());
    expect(originalHour).toBeGreaterThanOrEqual(11.5);

    await page.getByRole('link', { name: /^Incidents/ }).tap();
    const incidents = page.getByRole('region', { name: 'City emergencies' });
    await expect(incidents.locator('article')).toHaveCount(1);
    await incidents.getByRole('button', { name: 'Back to timeline from incident' }).tap();
    await expect(timeline).toBeFocused();
    await tapRange(timeline, 0.21);
    const deliveryHour = Number(await timeline.inputValue());
    expect(deliveryHour).toBeGreaterThan(0);
    expect(deliveryHour).toBeLessThan(6);
    await page.getByRole('region', { name: 'City systems' }).getByRole('button', { name: /Waterworks/ }).tap();
    const inspector = page.getByRole('region', { name: 'Building inspection' });
    const supply = inspector.getByRole('button', { name: 'Send backup supplies' });
    const sheet = (await inspector.boundingBox())!;
    const action = (await supply.boundingBox())!;
    expect(action.height).toBeGreaterThanOrEqual(44);
    expect(action.y + action.height).toBeLessThanOrEqual(sheet.y + sheet.height);
    await inspector.getByRole('button', { name: 'Collapse inspection' }).tap();
    await expect(supply).toBeHidden();
    await inspector.getByRole('button', { name: 'Expand inspection' }).tap();
    await supply.tap();
    await expect(inspector.getByRole('button', { name: 'Supplies delivered' })).toBeDisabled();
    await page.screenshot({ path: info.outputPath('inspection.png'), scale: 'css' });

    await page.getByRole('button', { name: 'Timeline details', exact: true }).tap();
    const responses = page.getByRole('combobox', { name: 'Replay branch' });
    await responses.selectOption('0');
    await expect(supply).toBeEnabled();
    await responses.selectOption('1');
    await expect(inspector.getByRole('button', { name: 'Supplies delivered' })).toBeDisabled();
    await page.getByRole('button', { name: 'Compare Futures', exact: true }).tap();
    const comparison = page.getByRole('region', { name: 'Compare Futures' });
    expect((await comparison.boundingBox())!.y).toBeLessThan((await page.locator('.secondary-tools').boundingBox())!.y);
    await tapRange(comparison.getByRole('slider', { name: 'Comparison preview' }), 0.5);
    await expect(comparison.getByText(/Citywide: \+\d+/)).toBeVisible();
    if (width > height) {
      const original = (await comparison.getByRole('region', { name: 'Original outcome' }).boundingBox())!;
      const revised = (await comparison.getByRole('region', { name: 'Revised outcome' }).boundingBox())!;
      expect(original.y).toBe(revised.y);
    }
    expect(Number(await timeline.inputValue())).toBe(deliveryHour);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({ path: info.outputPath('comparison.png'), scale: 'css' });
    await comparison.getByRole('button', { name: 'Back to timeline' }).tap();
    await expect(timeline).toBeFocused();
    await comparison.getByRole('button', { name: 'Close comparison' }).tap();
    await expect(comparison).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}
