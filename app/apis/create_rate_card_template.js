import apiFetch from 'utils/api_fetch';

const createRateCardTemplate = function createRateCardTemplate(data) {
    return new Promise((resolve, reject) => {
        apiFetch
        .authenticatedPost("v1/rateCardTemplate", data)
        .then((data) => resolve(data))
        .catch((response) => {
            if (response && response.message){
                return (reject(new Error(response.message)));
            }else if (response && response.status === 401) {
                return (reject(new Error("unauthorized")));
            } else {
                return (reject(new Error("something went wrong")));
            }
        });
    });
};

export default createRateCardTemplate;
