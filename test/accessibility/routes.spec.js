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

test("site uses a fixed light theme without a theme toggle", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("#light-toggle")).toHaveCount(0);
    await expect(page.locator('script[src*="theme.js"]')).toHaveCount(0);
    await expect(page.locator("#highlight_theme_dark")).toHaveCount(0);
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  }
});

test("footer stays minimal on every public route", async ({ page }) => {
  const expectedFooter = `© ${new Date().getFullYear()} Xianhua Yu.`;
  for (const route of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
    const footer = page.getByRole("contentinfo");
    await expect(footer).toHaveText(expectedFooter);
    await expect(footer.locator("a")).toHaveCount(0);
    await expect(footer).not.toContainText("Copyright");
    await expect(footer).not.toContainText("Powered by");
    await expect(footer).not.toContainText("Hosted by");
    await expect(footer).not.toContainText("Last updated");
  }
});

test("homepage contact line is accessible and wraps on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  const contactLine = page.locator(".about-contact-line");
  const email = contactLine.getByRole("link", { name: "yuxianhua@dgut.edu.cn" });
  const scholar = contactLine.getByRole("link", { name: "Google Scholar" });

  await expect(contactLine).toBeVisible();
  await expect(contactLine).toContainText("Email: yuxianhua@dgut.edu.cn");
  await expect(email).toHaveAttribute("href", "mailto:yuxianhua@dgut.edu.cn");
  await expect(scholar).toHaveAttribute("target", "_blank");
  await expect(scholar).toHaveAttribute("rel", /noopener/);
  await expect(contactLine.getByRole("link", { name: "CV" })).toHaveCount(0);

  const layout = await contactLine.evaluate((element) => ({
    right: element.getBoundingClientRect().right,
    viewport: document.documentElement.clientWidth,
    pageWidth: document.documentElement.scrollWidth,
  }));
  expect(layout.right).toBeLessThanOrEqual(layout.viewport);
  expect(layout.pageWidth).toBeLessThanOrEqual(layout.viewport);
});

test("mobile navigation expands and collapses with the preserved three links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  const toggle = page.getByRole("button", { name: "Toggle navigation" });
  const menu = page.locator("#navbarNav");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(menu.getByRole("link")).toHaveText(["About (current)", "Publications", "CV"]);
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("publication Bib button still opens its bibliography panel", async ({ page }) => {
  await page.goto("/publications/", { waitUntil: "networkidle" });
  const button = page.locator("a.bibtex.btn").first();
  const panel = page.locator("div.bibtex.hidden").first();
  await expect(button).toBeVisible();
  await button.click();
  await expect(panel).toBeVisible();
});

test("homepage research positioning and office location are consistent", async ({ page }) => {
  await page.setViewportSize({ width: 1792, height: 850 });
  await page.goto("/", { waitUntil: "networkidle" });

  const portrait = page.locator('.profile img[src*="xianhua-yu.png"]');
  await expect(portrait).toHaveCount(1);
  await expect(portrait).toHaveAttribute("alt", "Portrait of Xianhua Yu (余显华)");

  await expect(page.locator(".research-identity")).toHaveText(
    "My research develops signal processing and communication methods for resource-efficient intelligent wireless systems. My current interests include ambient IoT and backscatter communications, semantic communications, and low-altitude intelligent networking. Across these areas, I develop and apply wireless AI and learning-driven signal processing methods."
  );
  await expect(page.locator(".research-methodology")).toHaveText("Methodological Focus: Wireless AI and Learning-Driven Signal Processing");
  await expect(page.locator(".profile .more-info p")).toHaveText([
    "School of Electrical Engineering and Intelligentization",
    "Dongguan University of Technology",
    "Office: Room 1004, Zone A, Building 1",
    "International Cooperation and Innovation Zone",
    "(国际合作创新区1栋A区1004)",
  ]);

  const addressLines = await page.locator(".profile-office-line").evaluateAll((lines) =>
    lines.map((line) => {
      const range = document.createRange();
      range.selectNodeContents(line);
      return [...range.getClientRects()].length;
    })
  );
  expect(addressLines).toEqual([1, 1, 1]);

  const novemberNews = page.locator(".news tr").filter({ hasText: "Nov 2025" });
  await expect(novemberNews).toHaveCount(1);
  await expect(novemberNews.locator("td")).toHaveText(
    "Co-organized the 2025 Guangdong Graduate Academic Forum sub-forum on “Frontiers of Large Models and Storage Systems” (2025年广东省研究生学术论坛“大模型与存储系统前沿学术分论坛”), with Prof. Liuqing Yang as the keynote speaker at the opening ceremony."
  );
});

test("CV desktop date grid keeps labels and content aligned", async ({ page }) => {
  await page.setViewportSize({ width: 1792, height: 850 });
  await page.goto("/cv/", { waitUntil: "networkidle" });

  const badges = page.locator(".cv .cv-timeline-entry .date-column .badge");
  await expect(badges).toHaveText([
    "Dec. 2024–Present",
    "Feb.–Dec. 2024",
    "2021–2024",
    "2019–2020",
    "2017–2020",
    "2013–2017",
    "Jan. 2027–Dec. 2029",
    "Jan. 2025–Dec. 2027",
  ]);

  const layout = await page.locator(".cv .cv-timeline-entry").evaluateAll((entries) =>
    entries.map((entry) => {
      const dateColumn = entry.querySelector(".date-column");
      const badge = entry.querySelector(".date-column .badge");
      const content = entry.querySelector(".cv-entry-content");
      const title = content.querySelector(".title");
      const range = document.createRange();
      range.selectNodeContents(badge);
      const titleRange = document.createRange();
      titleRange.selectNodeContents(title);
      const badgeRect = badge.getBoundingClientRect();
      const titleFirstLine = [...titleRange.getClientRects()][0];
      return {
        centerDelta: Math.abs(badgeRect.top + badgeRect.height / 2 - (titleFirstLine.top + titleFirstLine.height / 2)),
        contentLeft: content.getBoundingClientRect().left,
        contentTop: content.getBoundingClientRect().top,
        dateTop: dateColumn.getBoundingClientRect().top,
        display: getComputedStyle(entry).display,
        textFits: badge.scrollWidth <= badge.clientWidth,
        textRects: [...range.getClientRects()].length,
        transform: getComputedStyle(dateColumn).transform,
        whiteSpace: getComputedStyle(badge).whiteSpace,
      };
    })
  );
  expect(layout.every((entry) => entry.display === "grid")).toBe(true);
  expect(layout.every((entry) => entry.transform === "none" && Math.abs(entry.dateTop - entry.contentTop) < 1)).toBe(true);
  expect(layout.every((entry) => entry.centerDelta < 0.5)).toBe(true);
  expect(layout.every((entry) => entry.whiteSpace === "nowrap" && entry.textRects === 1 && entry.textFits)).toBe(true);
  expect(Math.max(...layout.map((entry) => entry.contentLeft)) - Math.min(...layout.map((entry) => entry.contentLeft))).toBeLessThan(1);

  await expect(page.locator(".cv-translation-note")).toHaveCount(0);
  await expect(page.locator(".cv")).not.toContainText("English project titles are descriptive translations of the official Chinese titles.");
  await expect(page.locator(".cv")).not.toContainText("Appointment period:");
  await expect(page.locator(".cv")).not.toContainText("project period:");
  await expect(page.locator(".cv-funding-meta")).toHaveText(["Principal Investigator · RMB 300,000", "Principal Investigator · RMB 100,000"]);
  await expect(page.locator(".cv-primary-links")).toHaveCount(0);
  await expect(page.locator(".post-header").getByRole("link", { name: /Email|Google Scholar|Homepage/ })).toHaveCount(0);

  const contactCard = page.getByRole("heading", { name: "Contact Information", exact: true }).locator("..");
  await expect(contactCard.locator("b")).toHaveText(["Name", "Professional Title", "Email", "Office"]);
  await expect(contactCard.getByRole("link", { name: "yuxianhua@dgut.edu.cn" })).toHaveAttribute("href", "mailto:yuxianhua@dgut.edu.cn");
  await expect(contactCard.locator(".cv-location-line")).toHaveText([
    "Room 1004, Zone A, Building 1",
    "International Cooperation and Innovation Zone",
    "(国际合作创新区1栋A区1004)",
  ]);
  await expect(contactCard).not.toContainText("Location");
  await expect(contactCard).not.toContainText("Website");
  await expect(contactCard.locator('a[href="https://xian-hua.github.io/"]')).toHaveCount(0);

  await expect(page.getByRole("heading", { name: "Professional Service", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Selected Professional Service", exact: true })).toHaveCount(0);
  await expect(page.locator(".cv-professional-service li")).toHaveText(
    "Co-organizer, 2025 Guangdong Graduate Academic Forum sub-forum on “Frontiers of Large Models and Storage Systems.”"
  );
  await expect(page.locator(".cv-research-focus .interest-item")).toHaveText([
    "Research Areas: Ambient IoT and Backscatter Communications; Semantic Communications; Low-Altitude Intelligent Networking",
    "Methodological Focus: Wireless AI and Learning-Driven Signal Processing",
  ]);
  await expect(page.locator(".cv")).toContainText(
    "Tenure-track Associate Professor at Dongguan University of Technology working on resource-efficient intelligent wireless systems. Research interests include ambient IoT and backscatter communications, semantic communications, and low-altitude intelligent networking, with a methodological focus on wireless AI and learning-driven signal processing. Principal investigator of projects supported by the National Natural Science Foundation of China and the Guangdong Basic and Applied Basic Research Foundation."
  );
});

test("Scholar links use one canonical profile URL", async ({ page }) => {
  const canonicalScholar = "https://scholar.google.com/citations?user=mR4CJ4IAAAAJ";
  for (const route of ["/", "/publications/", "/cv/"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    const links = page.locator('a[href*="scholar.google.com/citations"]');
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", canonicalScholar);
    }
  }
});

test("CV mobile timeline stacks without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/cv/", { waitUntil: "networkidle" });

  const layout = await page.locator(".cv .cv-timeline-entry").evaluateAll((entries) =>
    entries.map((entry) => {
      const badge = entry.querySelector(".date-column .badge");
      const content = entry.querySelector(".cv-entry-content");
      const range = document.createRange();
      range.selectNodeContents(badge);
      const badgeRect = badge.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      return {
        badgeRight: badgeRect.right,
        contentTop: contentRect.top,
        dateBottom: badgeRect.bottom,
        textFits: badge.scrollWidth <= badge.clientWidth,
        textRects: [...range.getClientRects()].length,
      };
    })
  );
  expect(layout.every((entry) => entry.dateBottom <= entry.contentTop && entry.textRects === 1 && entry.textFits)).toBe(true);
  expect(layout.every((entry) => entry.badgeRight <= 390)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await expect(page.locator(".cv-funding-list")).toContainText("面向无源物联网的标签通感协同推断与跨场景适配机理研究");
  await expect(page.locator(".cv-funding-list")).toContainText("面向环境散射通信的无线电检测与并行解码机理研究");
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
