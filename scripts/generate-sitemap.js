// scripts/generate-sitemap.js
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HOSTNAME = "https://meiro-event.ru";

// СПИСОК МАРШРУТОВ — ДОБАВЛЯЙ СЮДА ВСЕ СТРАНИЦЫ
const sitemapRoutes = [
  "/",
  "/settings",
  "/event/my-events",
  // Добавь сюда все статические страницы
];

async function generateSitemap() {
  console.log("🔄 Генерация sitemap.xml...");
  console.log("📄 Маршрутов для добавления:", sitemapRoutes.length);

  const sitemap = new SitemapStream({ hostname: HOSTNAME });
  const writeStream = createWriteStream(
    path.resolve(__dirname, "../public/sitemap.xml"),
  );

  sitemap.pipe(writeStream);

  // Добавляем каждый маршрут
  for (const url of sitemapRoutes) {
    sitemap.write({ url });
    console.log(`  ✅ Добавлен: ${url}`);
  }

  sitemap.end();

  await streamToPromise(sitemap);
  console.log("✅ sitemap.xml успешно создан в public/");
}

generateSitemap().catch((error) => {
  console.error("❌ Ошибка:", error);
});
