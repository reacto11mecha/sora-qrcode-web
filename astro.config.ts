import { defineConfig } from "astro/config";

import { cardIntegration } from "./card-integration";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), cardIntegration()]
});
