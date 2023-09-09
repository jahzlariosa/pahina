// api.ts

export async function strapiFetch(endpoint: string, queryParams?: Record<string, string>) {
    const queryString = queryParams
      ? `?${Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&')}`
      : '';
  
    const url = `https://${process.env.BACKEND_API_DOMAIN}/api/${endpoint}${queryString}`;
  
    const response = await fetch(url, { next: { revalidate: 10 } });
    return response.json();
  }
  