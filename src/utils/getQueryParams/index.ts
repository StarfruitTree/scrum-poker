const getQueryParams = (): string | null =>
  new URLSearchParams(document.location.search).get('type');

export default getQueryParams;
