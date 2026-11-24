import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// The public address of the site. Canonical URLs, the sitemap and Open Graph
// tags all use this value. Change it here if a custom domain is added.
const SITE_URL = "https://sonawane-dhanashri.github.io";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  integrations: [sitemap()],
});
