const fs = require("fs");
const results = JSON.parse(
  fs.readFileSync(
    "/home/runner/work/lighthouse-cra/lighthouse-cra/lhci_reports/manifest.json"
  )
);

// comment에 담을 변수 입니다.
let comments = "";

results.forEach((result) => {
  const { summary, jsonPath } = result;
  const details = JSON.parse(fs.readFileSync(jsonPath));
  const formatResult = (res) => Math.round(res * 100);

  const { audits } = details;

  Object.keys(summary).forEach(
    (key) => (summary[key] = formatResult(summary[key]))
  );
  const score = (res) => (res >= 90 ? "🟢" : res >= 50 ? "🟠" : "🔴");
  const comment = [
    `⚡️ Lighthouse report!`,
    "| Category | Score |",
    "| --- | --- |",
    `| ${score(summary.performance)} Performance | ${summary.performance} |`,
    `| ${score(summary.accessibility)} Accessibility | ${
      summary.accessibility
    } |`,
    `| ${score(summary["best-practices"])} Best practices | ${
      summary["best-practices"]
    } |`,
    `| ${score(summary.seo)} SEO | ${summary.seo} |`,
    `| ${score(summary.pwa)} PWA | ${summary.pwa} |`,
    " ",
  ].join("\n");
  const detail = [
    "| Category | Score |",
    "| --- | --- |",
    `| ${score(
      audits["first-contentful-paint"].score * 100
    )} First Contentful Pain | ${
      audits["first-contentful-paint"].displayValue
    } |`,
    `| ${score(audits.interactive.score * 100)} Time to Interactive | ${
      audits.interactive.displayValue
    } |`,
    `| ${score(audits["speed-index"].score * 100)} SpeedIndex | ${
      audits["speed-index"].displayValue
    } |`,
    `| ${score(
      audits["total-blocking-time"].score * 100
    )} Total Blocking Time | ${audits["total-blocking-time"].displayValue} |`,
    `| ${score(
      audits["largest-contentful-paint"].score * 100
    )} Largest Contentful Pain | ${
      audits["largest-contentful-paint"].displayValue
    } |`,
    `| ${score(
      audits["cumulative-layout-shift"].score * 100
    )} Cumulative Layout Shift | ${
      audits["cumulative-layout-shift"].displayValue
    } |`,
    " ",
  ].join("\n");
  comments += comment + "\n" + detail + "\n";
});
core.setOutput("comments", comments);
