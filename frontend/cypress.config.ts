import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1920,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
