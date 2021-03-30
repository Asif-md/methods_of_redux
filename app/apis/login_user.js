import apiFetch from 'utils/api_fetch';

const loginUser = function loginUser(login, password) {
  return new Promise((resolve, reject) => {
    apiFetch
      .postQuick({
        endpoint: "v1/login",
        auth: `${login}:${password}`
      })
      .then((data) => resolve({ name: login }))
      .catch((response) => {
        if (response && response.status === 401) {
          return (reject(new Error("unauthorized")));
        } else {
          return (reject(new Error("something went wrong")));
        }
      });
  });
};

export default loginUser;
