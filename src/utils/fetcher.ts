export const fetcher = (url: string, query : string = '') => fetch(`${url}${query ? `?${query}` : ''}`).then(res => res.json())
