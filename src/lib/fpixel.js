// Pixel - IMD (Meta). ID público; fallback garante deploy sem env configurado.
// Override possível via NEXT_PUBLIC_FACEBOOK_PIXEL_ID.
export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1498906348676676";

export const pageview = () => {
  window.fbq("track", "PageView");
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  window.fbq("track", name, options);
};