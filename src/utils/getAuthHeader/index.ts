import CookieReader from 'js-cookie';

const getAuthHeader = (): string | null =>
  CookieReader.get('jwtToken') ? `Bearer ${CookieReader.get('jwtToken')}` : null;

export default getAuthHeader;
