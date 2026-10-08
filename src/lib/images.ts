/**
 * Single source of truth for image uploads across portfolio_muse.
 * Profile, project thumbs, certificates, experience images — all go through here.
 */

/** File-picker filter. Use on every <input type="file"> for images. */
export const IMAGE_ACCEPT = ".png,.jpg,.jpeg,image/png,image/jpeg";

/** PDF filter for certificate downloads / resume. */
export const DOC_ACCEPT = ".pdf,application/pdf";

const EXT_TO_MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
};

export const IMAGE_MIMES = new Set(Object.values(EXT_TO_MIME));
export const MAX_IMAGE_MB = 10;

export function extOf(filename: string): string {
  const dot = filename.lastIndexOf(".");
  return dot < 0 ? "" : filename.slice(dot + 1).toLowerCase();
}

/** Validate BOTH extension and MIME type. Returns an error string or null. */
export function validateImageFile(
  file: { name: string; type: string; size: number },
  maxMB = MAX_IMAGE_MB
): string | null {
  const ext = extOf(file.name);
  if (!EXT_TO_MIME[ext]) {
    return `“${file.name}” isn’t supported. Use .png, .jpg or .jpeg.`;
  }
  if (!IMAGE_MIMES.has(file.type)) {
    return `“${file.name}” has an unexpected file type (${file.type || "unknown"}). Re-export it as PNG or JPG.`;
  }
  // Extension and MIME must agree (catches renamed .webp/.gif etc.)
  if (EXT_TO_MIME[ext] !== file.type) {
    return `“${file.name}” looks like a renamed file (says .${ext}, behaves as ${file.type}). Please re-export it.`;
  }
  if (file.size > maxMB * 1024 * 1024) {
    return `“${file.name}” is ${(file.size / 1048576).toFixed(1)} MB — keep it under ${maxMB} MB.`;
  }
  if (file.size === 0) return `“${file.name}” is empty.`;
  return null;
}

/** Validate a PDF upload (certificate downloads, resume). */
export function validatePdfFile(
  file: { name: string; type: string; size: number },
  maxMB = MAX_IMAGE_MB
): string | null {
  if (extOf(file.name) !== "pdf" || file.type !== "application/pdf") {
    return `“${file.name}” isn’t a PDF. Export it as .pdf first.`;
  }
  if (file.size > maxMB * 1024 * 1024) {
    return `“${file.name}” is ${(file.size / 1048576).toFixed(1)} MB — keep it under ${maxMB} MB.`;
  }
  if (file.size === 0) return `“${file.name}” is empty.`;
  return null;
}

/** Canonical extension for a validated MIME type (preserves the real format). */
export function extFromMime(mime: string): string {
  return mime === "image/png" ? "png" : "jpg";
}
