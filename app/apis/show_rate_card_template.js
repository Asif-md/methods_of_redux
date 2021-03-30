import apiFetch from 'utils/api_fetch';

const showRateCardTemplate = function showRateCardTemplate(id) {
  return apiFetch.authenticatedGet(`v1/rateCardTemplate/${id}`);
};

export default showRateCardTemplate;
