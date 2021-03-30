import apiFetch from 'utils/api_fetch';

const getSacCode = function getSacCode() {
    return apiFetch.authenticatedGet("v1/gst/sac/list");
};

export default getSacCode;
