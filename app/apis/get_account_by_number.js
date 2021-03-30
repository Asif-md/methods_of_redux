import apiFetch from 'utils/api_fetch';

const getAccountByNumber = function getAccountByNumber(accountNo) {
  return apiFetch.authenticatedGet(`v1/account/accountNo/${accountNo}`);
};

export default getAccountByNumber;
