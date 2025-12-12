/**
 * Admin API Client
 * 
 * Wrapper for fetch that automatically includes credentials (cookies)
 * for authenticated requests to the admin API.
 */

interface FetchOptions extends RequestInit {
  body?: any;
}

/**
 * Make an authenticated API request
 * Automatically includes credentials (cookies) with all requests
 */
export async function apiRequest(url: string, options: FetchOptions = {}) {
  const defaultOptions: RequestInit = {
    credentials: 'include', // Always send cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // If body is an object, stringify it
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  });

  return response;
}

/**
 * GET request
 */
export async function apiGet(url: string, options: FetchOptions = {}) {
  return apiRequest(url, { ...options, method: 'GET' });
}

/**
 * POST request
 */
export async function apiPost(url: string, data?: any, options: FetchOptions = {}) {
  return apiRequest(url, {
    ...options,
    method: 'POST',
    body: data,
  });
}

/**
 * File upload request
 */
export async function apiUpload(url: string, file: File, options: FetchOptions = {}) {
  const formData = new FormData();
  formData.append('file', file);

  return fetch(url, {
    method: 'POST',
    credentials: 'include', // Include cookies for authentication
    body: formData,
    ...options,
  });
}
