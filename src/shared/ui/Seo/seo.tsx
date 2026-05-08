// src/shared/ui/seo/Seo.tsx
import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

const SITE_URL = "https://meiro-event.ru";
const DEFAULT_IMAGE = `${SITE_URL}/public/favicon.svg`;

export const Seo = ({ title, description, image, url }: SeoProps) => {
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const ogImage = image || DEFAULT_IMAGE;
  const pageName = `${title} | MEIRO`;

  return (
    <Helmet>
      {/* Базовые */}
      <title>{pageName}</title>
      <meta name="description" content={description} />

      {/* Open Graph для соцсетей */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Meiro Event" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
