import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://ilmhadith.com';
const SITE_NAME = 'IlmHadith';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * SEO component — drop into any page to set per-page meta tags.
 *
 * Usage:
 *   <SEO
 *     title="Hadith Collection"
 *     description="Browse authentic Hadiths..."
 *     path="/hadith-list"
 *     type="website"
 *     schema={[...]}          // optional extra JSON-LD objects
 *   />
 */
export default function SEO({
  title,
  description,
  keywords,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  schema = [],
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Authentic Hadith & Islamic Knowledge`;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      {/* Basic */}
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Extra JSON-LD schema passed by each page */}
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
