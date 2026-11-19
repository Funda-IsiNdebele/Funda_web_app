import { defineConfig, type ProxyOptions } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// The API has no CORS headers, so the browser talks to /api on our own origin
// and Vite forwards it. Hosting the built app needs an equivalent rewrite.
const apiProxy: Record<string, ProxyOptions> = {
  "/api": {
    target: "https://2ptf02nybg.execute-api.us-east-1.amazonaws.com",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, "/Prod"),
  },
};

const DAY = 24 * 60 * 60;

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      // public/manifest.webmanifest is linked from index.html; keep using it.
      manifest: false,
      workbox: {
        // 1. Precache the app shell and every bundled image so repeat visits load instantly and offline.
        globPatterns: ["**/*.{js,css,html,svg,png,PNG,jpg,jpeg,webp,woff,woff2,webmanifest}"],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // 2. API data: answer from cache immediately, refresh in the background.
            urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith("/api/"),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "funda-api",
              expiration: { maxEntries: 100, maxAgeSeconds: 30 * DAY },
              cacheableResponse: { statuses: [200] },
            },
          },
          {
            // 3. Photos from the image hosts: download once, then serve from the device.
            // Hosts send no CORS headers, so responses are opaque (status 0).
            urlPattern: ({ request, sameOrigin }) => !sameOrigin && request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "funda-images",
              expiration: { maxEntries: 200, maxAgeSeconds: 14 * DAY, purgeOnQuotaError: true },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  server: { proxy: apiProxy },
  preview: { proxy: apiProxy },
});
