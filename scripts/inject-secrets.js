import fs from "fs";
import path from "path";

const replacements = {
  __PP_CLIENT_ID__: process.env.PP_CLIENT_ID,
};

// Where to replace placeholders (you can add more files if needed)
const TARGET_FILES = ["public/index.html", "src/App.tsx"];

for (const file of TARGET_FILES) {
  const fullPath = path.resolve(file);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️ Skipping missing file: ${file}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, "utf8");
  for (const [placeholder, value] of Object.entries(replacements)) {
    if (value) {
      content = content.replaceAll(placeholder, value);
    }
  }
  fs.writeFileSync(fullPath, content);
  console.log(`✅ Injected secrets into ${file}`);
}
