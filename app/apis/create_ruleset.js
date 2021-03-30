import apiFetch from 'utils/api_fetch';

const createRuleset = function createRuleset(ruleset) {
  
  return new Promise((resolve, reject) => {
    apiFetch
      .post("v1/ruleset", ruleset)
      .then((data) => resolve(data))
      .catch((response) => {
        if (response && response.status === 401) {
          return (reject(new Error("unauthorized")));
        } else {
          return (reject(new Error("something went wrong")));
        }
      });
  });
};

export default createRuleset;
