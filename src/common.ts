export function getApiUrl(url: string, token: string): string {
  return `${url.endsWith('/') ? url.trim() : url.trim() + '/'}message?token=${token.trim()}`;
}

export function parsePriority(input: string): number | undefined {
  if (input.trim().length === 0) {
    return undefined;
  }

  const priority = parseInt(input);
  return Number.isNaN(priority) ? undefined : priority;
}

export function parseContentType(input: string): string {
  return input.trim() || 'text/plain';
}

export function isDisplayContentType(input: string): input is DisplayContentType {
  return ['text/plain', 'text/markdown'].includes(input);
}

function isExtrasType(value: unknown): value is ExtrasType {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && Object.prototype.toString.call(value) === '[object Object]';
}

export function parseExtras(input: string): ExtrasType | undefined | null {
  if (input.trim().length === 0) {
    return undefined;
  }

  try {
    const res = JSON.parse(input);
    return isExtrasType(res) ? res : null;
  } catch {
    return null;
  }
}
