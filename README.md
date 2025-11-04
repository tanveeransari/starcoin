# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#E-MX Customs This is a web site written for sharing motorcycle related products. A storefront may be coming soon. Stay tuned for more info

🚀 GitHub Actions Build & Deploy

This project automatically builds and deploys the website to GitHub Pages whenever code is pushed to the main branch.

🧩 Workflow Overview

The workflow is defined in .github/workflows/deploy.yml

It performs the following steps:

Checkout the repository

Install dependencies with npm ci

Inject repository secrets into source and public files

Build the project using npm run build

Deploy the contents of /build to the gh-pages branch

Your site is automatically published to: 👉 https://tanveeransari.github.io/starcoin

🔐 Managing Secrets

Secrets used during the build are configured in your repository under: Settings → Secrets and variables → Actions

Example secrets:

API_URL=https://api.example.com MAPS_KEY=your-public-api-key

These are made available to the workflow as environment variables and injected into your code using the script below.

🧠 Secret Injection Script

Located at scripts/inject-secrets.js:

import fs from "fs"; import path from "path";

const replacements = { "**API_URL**": process.env.API_URL, "**MAPS_KEY**": process.env.MAPS_KEY, };

const TARGET_FILES = [ "public/index.html", "src/config.tsx", "src/constants.tsx", ];

for (const file of TARGET_FILES) { const fullPath = path.resolve(file); if (!fs.existsSync(fullPath)) continue;

let content = fs.readFileSync(fullPath, "utf8"); for (const [placeholder, value] of Object.entries(replacements)) { if (value) content = content.replaceAll(placeholder, value); } fs.writeFileSync(fullPath, content); console.log(`✅ Injected secrets into ${file}`); }

Use placeholders like **API_URL** and **MAPS_KEY** in your HTML or TypeScript files. They’ll be replaced during the CI build step before deployment.

⚠️ Security Notes

GitHub Pages serves static files — only inject public-safe values (API URLs, public keys, etc.).

Never inject private credentials or tokens; they will become visible in client-side JavaScript.

Secrets are not committed to the repository; they exist only during the GitHub Actions build.

🧾 Example Placeholders

In src/config.tsx:

export const API_URL = "**API_URL**"; export const MAPS_KEY = "**MAPS_KEY**";

In public/index.html:

<script>
  window.API_URL = "__API_URL__";
</script>

🧠 Triggering Deployment

Every push to main automatically:

Builds the project

Replaces placeholders with secrets

Deploys to GitHub Pages (gh-pages branch)

If you ever need to redeploy manually, just make a new commit or re-push to main.
