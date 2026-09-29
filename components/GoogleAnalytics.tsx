"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const MEASUREMENT_ID = "G-S410KP4B9T";

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Keep local development and Vercel previews out of the live reports.
    setEnabled(
      ["yanlongphuket.com", "www.yanlongphuket.com"].includes(
        window.location.hostname,
      ),
    );
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${MEASUREMENT_ID}');
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
