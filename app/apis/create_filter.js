import apiFetch from 'utils/api_fetch';

const createFilter = function createFilter({
  name,
  expression,
  rulesetId
}) {
  return new Promise((resolve, reject) => {
    apiFetch
      .post("v1/filter", {
        name,
        expression,
        ruleSet: rulesetId
      })
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

export default createFilter;
