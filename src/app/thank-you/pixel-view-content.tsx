"use client";

import { useEffect } from "react";

/**
 * Fires a Meta Pixel ViewContent event once when the thank-you page mounts.
 * Only users with the ugc_access cookie reach this page, so this event
 * signals a qualified lead who actually saw the video page.
 */
export function PixelViewContent() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: "Masterclass Video Page",
        content_category: "thank-you",
      });
    }
  }, []);

  return null;
}
