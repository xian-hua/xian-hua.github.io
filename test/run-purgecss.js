const fs = require("fs");
const path = require("path");
const { PurgeCSS } = require("purgecss");
const config = require("../purgecss.config.js");

async function run() {
  const results = await new PurgeCSS().purge(config);
  fs.mkdirSync(config.output, { recursive: true });

  for (const result of results) {
    const output = path.join(config.output, path.basename(result.file));
    fs.writeFileSync(output, result.css);
    process.stdout.write(`Purged ${result.file} -> ${output}\n`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
