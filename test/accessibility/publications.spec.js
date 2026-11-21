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
    const doi = wcl.locator('a[href="https://doi.org/10.1109/LWC.2026.3729739"]');
    const bib = wcl.getByRole("button", { name: "Bib", exact: true });
    const panel = wcl.locator("div.bibtex");
    await expect(wcl.locator(".periodical").first()).toHaveText("IEEE Wireless Communications Letters, vol. 15, pp. 5130–5134, 2026");
    await expect(bib).toHaveAttribute("aria-controls", await panel.getAttribute("id"));
    await expect(bib).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeHidden();
    await doi.focus();
    await page.keyboard.press("Tab");
    await expect(bib).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(bib).toHaveAttribute("aria-expanded", "true");
    await expect(panel).toBeVisible();
    await expect(panel).toContainText("5130--5134");
    await page.keyboard.press("Tab");
    await expect(panel.locator("pre")).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Space");
    await expect(bib).toHaveAttribute("aria-expanded", "false");
    await expect(bib).toBeFocused();
    await expect(panel).toBeHidden();
    await page.keyboard.press("Tab");
    expect(await wcl.evaluate((entry) => entry.contains(document.activeElement))).toBe(false);

    const iccc = page.locator("#liang2026beam");
    await expect(iccc).toHaveCount(1);
    await expect(iccc.locator(".title")).toHaveText("Beam-Aware Computation Offloading for Dual-Tier UAV Networks via Evolutionary Game Learning");
    await expect(iccc.locator('a[href="https://doi.org/10.1109/ICCC70295.2026.11680487"]')).toBeVisible();

    const vtc = page.locator("#yang2026uav");
    await expect(vtc).toHaveCount(1);
    await expect(vtc.locator(".periodical").first()).toContainText("2026 IEEE 103rd Vehicular Technology Conference (VTC2026-Spring)");
    await expect(vtc.locator('a[href="https://doi.org/10.1109/VTC2026-Spring68026.2026.11757769"]')).toBeVisible();
    await expect(vtc.locator(".periodical").first()).toContainText("pp. 1–6, Jun 2026");
    await vtc.getByRole("button", { name: "Bib", exact: true }).click();
    await expect(vtc.locator("div.bibtex")).toContainText("pages = {1--6}");
    await vtc.getByRole("button", { name: "Bib", exact: true }).click();

    const tmc = page.locator("#qin2026fairness");
    await expect(tmc.locator(".periodical").first()).toContainText("vol. 25, no. 11, pp. 21330–21344, Nov 2026");
    await tmc.getByRole("button", { name: "Bib", exact: true }).click();
    await expect(tmc.locator("div.bibtex")).toContainText("volume = {25}");
    await expect(tmc.locator("div.bibtex")).toContainText("number = {11}");
    await expect(tmc.locator("div.bibtex")).toContainText("pages = {21330--21344}");
    await tmc.getByRole("button", { name: "Bib", exact: true }).click();
    await expect(tmc.locator("div.bibtex")).not.toBeVisible();

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: test.info().outputPath(`publications-${width}.png`), fullPage: true });
  });

  test(`news entries display as plain text at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/news/"]) {
      await page.goto(route, { waitUntil: "networkidle" });
      const news = page.locator(".news");
      await expect(news.locator("td").first()).toBeVisible();
      await expect(news.locator("td a")).toHaveCount(0);
      await expect(news.getByText("IEEE Journal on Selected Areas in Communications", { exact: true })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      if (route === "/") {
        await expect(news.locator("tr")).toHaveCount(3);
        expect(await news.evaluate((element) => element.scrollHeight <= element.clientHeight + 1)).toBe(true);
        await expect(page.getByRole("link", { name: "View all news" })).toHaveAttribute("href", "/news/");
        await page.screenshot({ path: test.info().outputPath(`home-${width}.png`), fullPage: true });
      } else {
        const wcl = news.locator("tr").filter({ hasText: "Block-Correlation-Based Outage Analysis" });
        await expect(wcl.locator("th")).toHaveText("Aug 2026");
        await expect(news).toContainText("UAV-Assisted Anti-Jamming Relay Design for Reliable Federated Learning in Mobile Networks");
        const conferencePaper = news.locator("tr").filter({ hasText: "2026 IEEE Global Communications Conference" });
        await expect(conferencePaper.locator("th")).toHaveText("Aug 2026");
      }
    }
  });
}
