const AxeBuilder = require("@axe-core/playwright").default;
const { expect, test } = require("@playwright/test");

const routes = ["/", "/publications/", "/cv/", "/news/"];

for (const route of routes) {
  test(`axe: ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test("homepage academic links are accessible and wrap on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  const linkRow = page.locator(".about-academic-links");
  await expect(linkRow).toBeVisible();
  await expect(linkRow.getByRole("link", { name: /Google Scholar profile/ })).toBeVisible();
  await expect(linkRow.getByRole("link", { name: "Email Xianhua Yu" })).toBeVisible();
  await expect(linkRow.getByRole("link", { name: "Web CV" })).toBeVisible();

  const layout = await linkRow.evaluate((element) => ({
    right: element.getBoundingClientRect().right,
    viewport: document.documentElement.clientWidth,
    pageWidth: document.documentElement.scrollWidth,
  }));
  expect(layout.right).toBeLessThanOrEqual(layout.viewport);
  expect(layout.pageWidth).toBeLessThanOrEqual(layout.viewport);
});

test("heading levels do not skip within primary content", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
    const levels = await page
      .locator("main h1, main h2, main h3, main h4, main h5, main h6")
      .evaluateAll((headings) =>
        headings.filter((heading) => heading.getClientRects().length > 0).map((heading) => Number(heading.tagName.slice(1)))
      );
    for (let index = 1; index < levels.length; index += 1) {
      expect(levels[index] - levels[index - 1], `${route}: heading level jump`).toBeLessThanOrEqual(1);
    }
  }
});
