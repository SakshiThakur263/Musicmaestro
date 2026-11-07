// Global safety net for broken images.
// If any <img> fails to load (e.g. an external host removed the file, or old
// image URLs are still stored in the database), swap it for a locally bundled
// artist photo so cards never render as empty boxes.

const LOCAL_IMAGE_COUNT = 15;

const pickLocalImage = (seed = '') => {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `/artists/artist-${(h % LOCAL_IMAGE_COUNT) + 1}.jpg`;
};

export const installImageFallback = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener(
    'error',
    (event) => {
      const img = event.target;
      if (!(img instanceof HTMLImageElement)) return;
      // Only retry once to avoid infinite error loops
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = 'true';
      img.removeAttribute('srcset');
      img.src = pickLocalImage(img.alt || img.src);
    },
    true // capture phase: image error events do not bubble
  );
};

