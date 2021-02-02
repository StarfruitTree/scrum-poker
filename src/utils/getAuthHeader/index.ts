import CookieReader from 'js-cookie';

const getAuthHeader = (): string => (CookieReader.get('jwtToken') ? `Bearer ${CookieReader.get('jwtToken')}` : '');

export default getAuthHeader;
