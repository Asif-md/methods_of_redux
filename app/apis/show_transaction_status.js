import apiFetch from 'utils/api_fetch';

/**
 * @author ashwin.raghavan
 */

const showTransactionStatus = function showTransactionStatus(id) {
    return apiFetch.authenticatedGet(`v1/transaction/status/${id}`);
};

export default showTransactionStatus;

