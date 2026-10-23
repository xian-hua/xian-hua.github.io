const { expect, test } = require("@playwright/test");

for (const width of [1366, 390]) {
  test(`verified publication updates at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/publications/", { waitUntil: "networkidle" });
    await expect(page.locator(".publications .title")).toHaveCount(23);

    const wcl = page.locator("#wu2026block");
    await expect(wcl).toHaveCount(1);
    await expect(wcl.locator(".title")).toHaveText("Block-Correlation-Based Outage Analysis for FAS-Assisted Wireless Powered Communication");
    await expect(wcl.locator(".author")).toHaveText(
      "Zhenguan Wu, Xiazhi Lai, Junteng Yao, Xianhua Yu, Tuo Wu, Naofal Al-Dhahir, and Fumiyuki Adachi"
    );
    await expect(wcl.locator('a[href="https://doi.org/10.1109/LWC.2026.3729739"]')).toBeVisible();
    await wcl.locator("a.bibtex").click();
    await expect(wcl.locator("div.bibtex")).toBeVisible();
    await expect(wcl.locator("div.bibtex")).toContainText("5130--5134");
    await wcl.locator("a.bibtex").click();
    await expect(wcl.locator("div.bibtex")).not.toBeVisible();

    const iccc = page.locator("#liang2026beam");
    await expect(iccc).toHaveCount(1);
    await expect(iccc.locator(".title")).toHaveText("Beam-Aware Computation Offloading for Dual-Tier UAV Networks via Evolutionary Game Learning");
    await expect(iccc.locator('a[href="https://doi.org/10.1109/ICCC70295.2026.11680487"]')).toBeVisible();

    const vtc = page.locator("#yang2026uav");
    await expect(vtc).toHaveCount(1);
    await expect(vtc.locator(".periodical").last()).toHaveText("Accepted; listed in the official conference program");
    await expect(vtc.locator('a[href="https://icons-research-group.github.io/VTC2026-Spring-DTPI/"]')).toBeVisible();
    await expect(vtc.locator('a[href*="doi.org"]')).toHaveCount(0);

    const tmc = page.locator("#qin2026fairness");
    await expect(tmc.locator(".periodical").first()).toContainText("Nov 2026");
    await tmc.locator("a.bibtex").click();
    await expect(tmc.locator("div.bibtex")).toContainText("volume = {25}");
    await expect(tmc.locator("div.bibtex")).toContainText("number = {11}");
    await expect(tmc.locator("div.bibtex")).toContainText("pages = {21330--21344}");
    await tmc.locator("a.bibtex").click();
    await expect(tmc.locator("div.bibtex")).not.toBeVisible();

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: test.info().outputPath(`publications-${width}.png`), fullPage: true });
  });

  test(`publication news links at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/news/"]) {
      await page.goto(route, { waitUntil: "networkidle" });
      const wclNews = page.locator(".news tr").filter({ hasText: "Congratulations to Zhenguan!" }).first();
      await expect(wclNews.locator("th")).toHaveText("Aug 2026");
      await expect(wclNews.locator('a[href="https://doi.org/10.1109/LWC.2026.3729739"]')).toBeVisible();
      await expect(page.locator('.news a[href*="VTC2026-Accepted-Papers.pdf"]')).toHaveText(
        "“UAV-Assisted Anti-Jamming Relay Design for Reliable Federated Learning in Mobile Networks”"
      );
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      if (route === "/") {
        await page.screenshot({ path: test.info().outputPath(`home-${width}.png`), fullPage: true });
      }
    }
  });
}
