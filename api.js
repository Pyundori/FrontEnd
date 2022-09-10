import axios from 'axios';
import getEnvVars from './environment';
/**
 *
 * @param {string} method 'get' | 'post' | 'put' | 'delete'
 * @param {string} path baseUrl 뒤의 API경로
 * @param {object} data 'post'에 쓰이는 body object
 * @param {string} jwt access token
 * @param {object} params 'get'에 쓰이는 parameter object
 * @returns {import('axios').AxiosResponse} path에 따라 적절한 API를 호출함.
 */
const callApi = async (method, path, data, jwt, params = {}) => {
  const headers = {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  };
  const { baseUrl } = getEnvVars();
  const fullUrl = `${baseUrl}${path}`;

  if (method === 'get') {
    return await axios[method](fullUrl, { headers, params });
  } else {
    return await axios[method](fullUrl, data, { headers });
  }
};

export default {
  /**
   *
   * @param {*} id User Id
   * @param {*} pw User Password
   * @param {*} nickname User Nickname
   * @returns {object} res_code, token
   */
  signUp: (id, pw, nickname) => callApi('post', '/api/user/signup', { id, pw, name: nickname }),

  /**
   *
   * @param {string} id User Id
   * @param {string} pw User Password
   * @param {string} token User jwt
   * @returns {object} res_code, token | jwt_tolen
   */
  login: (id, pw) => callApi('post', '/api/user/signin', { id, pw }),

  /**
   *
   * @param {string} token Access Token
   * @returns
   */
  googleLogin: (token) => callApi('post', '/google/oauth2/callback', { token }),

  /**
   *
   * @param {string} token Access Token
   * @returns
   */
  kakaoLogin: (token) => callApi('post', '/kakao/oauth2/callback', { token }),

  /**
   *
   * @param {string} column 'id' | 'name'
   * @param {string} data User's input value
   * @returns {boolean} true | false
   */
  isDuplicated: (column, data) => {
    const {
      data: { res_code },
    } = callApi('get', '/api/user/check_dup', null, '', {
      column,
      data,
    });
    if (res_code === 201) {
      return false;
    } else {
      return true;
    }
  },

  /**
   *
   * @param {string} token jwt
   * @returns User's Data
   */
  getUserData: (token) => callApi('post', '/api/user/get', { token }),

  /**
   *
   * @param {*} token jwt
   * @param {*} col 'password' or 'name'
   * @param {*} data Value
   * @returns
   */
  modifyUserData: (token, col, data) => callApi('post', '/api/user/modify', { token, col, data }),
  /**
   *
   * @param {string} conv  편의점 이름
   * @param {string} dtypes 할인 타입 = {1N1, 2N1, 3N1, GIFT, SALE}
   * @param {string} searchWord 검색할 단어
   * @param {number} page 검색 결과 페이지, 기본값 = 1
   * @returns
   */
  search: (conv, dtypes, searchWord = '', page = 1) =>
    callApi('get', '/api/product/query', null, '', {
      venders: conv,
      dtypes: dtypes,
      products: searchWord,
      page: page,
    }),
};
