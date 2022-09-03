import axios from 'axios';
/**
 *
 * @param {string} method
 * @param {object} params {venders: 편의점 이름, dtypes: 할인타입(1N1, 2N1, SALE, GIFT ...), products: 검색어, page: 페이지 번호}
 * @returns
 */
const callApi = async (method, params = {}) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const URL = 'http://54.180.109.216:5000/api/product_query';

  if (method === 'get') {
    return await axios[method](URL, { headers, params });
  } else {
    return;
  }
};

export default {
  /**
   *
   * @param {string} conv  편의점 이름
   * @param {string} dtypes 할인 타입 = {1N1, 2N1, 3N1, GIFT, SALE}
   * @param {string} searchWord 검색할 단어
   * @param {number} page 검색 결과 페이지, 기본값 = 1
   * @returns
   */
  search: (conv, dtypes, searchWord = '', page = 1) =>
    callApi('get', { venders: conv, dtypes: dtypes, products: searchWord, page: page }),
};
