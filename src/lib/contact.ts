/**
 * Copy text to the clipboard. `navigator.clipboard` only exists in secure
 * contexts (https / localhost) and can reject without a user gesture, so a
 * hidden-textarea fallback covers the rest. Resolves to whether it worked —
 * callers show "Copied" or leave the mailto link as the fallback.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }

  try {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

/** Smooth-scroll to an in-page anchor, honouring reduced motion. */
export function scrollToSection(hash: string, reduceMotion = false) {
  const target = hash === '#' || hash === '#hero' ? document.body : document.querySelector(hash);
  if (!target) return false;
  if (hash === '#' || hash === '#hero') {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  } else {
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
  return true;
}
