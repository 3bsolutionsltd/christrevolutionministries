// Cache versioning system to bust browser cache when content changes
let cacheVersion = Date.now();

export function getCacheVersion(): number {
  return cacheVersion;
}

export function updateCacheVersion(): void {
  cacheVersion = Date.now();
}

export function addCacheVersion(url: string): string {
  if (!url) return url;
  
  // Don't add cache version to external URLs
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${cacheVersion}`;
}