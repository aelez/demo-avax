const detected = null;

export default function isMobile(onSSR = true) {
  // already detected
  if (detected !== null) return detected;

  // if SSR return default
  if (_SSR_) return onSSR;

  return window.innerWidth <= 375;
}
