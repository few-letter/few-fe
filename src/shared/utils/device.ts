export const isMobileDevice = () =>
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export const isWebView = () => /WebView|wv/.test(navigator.userAgent);
