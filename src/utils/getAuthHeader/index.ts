import CookieReader from 'js-cookie';

const getAuthHeader = (): string => `Bearer ${CookieReader.get('jwtToken')}`;

export default getAuthHeader;
