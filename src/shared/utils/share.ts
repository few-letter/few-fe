const isMobileDevice = (): boolean => {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const canUseWebShare = (): boolean => {
  return isMobileDevice() && !!navigator.share;
};

const shareViaWebShare = async (params: {
  title: string;
  url: string;
}): Promise<"success" | "cancelled" | "failed"> => {
  try {
    await navigator.share(params);
    return "success";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return "cancelled";
    }
    return "failed";
  }
};

const copyToClipboardViaAPI = async (text: string): Promise<boolean> => {
  if (!navigator.clipboard) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

const copyToClipboardViaFallback = (text: string): boolean => {
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const result = document.execCommand("copy");
    document.body.removeChild(textarea);
    return result;
  } catch {
    return false;
  }
};

const copyToClipboard = async (text: string): Promise<boolean> => {
  const copiedViaAPI = await copyToClipboardViaAPI(text);
  if (copiedViaAPI) return true;

  return copyToClipboardViaFallback(text);
};

export {
  isMobileDevice,
  canUseWebShare,
  shareViaWebShare,
  copyToClipboard,
  copyToClipboardViaAPI,
  copyToClipboardViaFallback,
};
