const getQueryParams = (param: string): string | null =>
  new URLSearchParams(document.location.search).get(param);

export default getQueryParams;
