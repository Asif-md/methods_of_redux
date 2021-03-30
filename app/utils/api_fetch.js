import fetch from "isomorphic-fetch";

// http://stg-mesoss105.phonepe.nm2:31975

// http://valhalla-v2.traefik.stg.phonepe.com

const DEV_END_POINT = "http://valhalla-v2.traefik.stg.phonepe.nb6";
const testing = false;

const apiFetch = {
  post(endpoint, body = {}) {
    return this._makeRequest({
      method: "POST",
      endpoint,
      body
    });
  },

  put(endpoint, body = {}) {
    return this._makeRequest({
      method: "PUT",
      endpoint,
      body
    });
  },

  // do not care about the response. only the status
  postQuick({ endpoint, body = {}, auth }) {
    return this._makeRequest({
      method: "POST",
      endpoint,
      body,
      auth,
      parseJson: false
    });
  },

  get(endpoint, body = {}) {
    return this._makeRequest({
      method: "GET",
      endpoint,
      body
    });
  },

  createRule(endpoint, rulesetId, request) {
    return new Promise((resolve, reject) => {
      this.post(endpoint, {
        ruleId: rulesetId,
        ...request
      })
        .then(data => resolve(data))
        .catch(this._checkAuthentication.bind(null, resolve, reject));
    });
  },

  authenticatedGet(endpoint, body = {}) {
    return new Promise((resolve, reject) => {
      this.get(endpoint, body)
        .then(data => resolve(data))
        .catch(this._checkAuthentication.bind(null, resolve, reject));
    });
  },

  authenticatedPut(endpoint, body) {
    return new Promise((resolve, reject) => {
      this.put(endpoint, body)
        .then(data => resolve(data))
        .catch(this._checkAuthentication.bind(null, resolve, reject));
    });
  },

  authenticatedPost(endpoint, body) {
    return new Promise((resolve, reject) => {
      this.post(endpoint, body)
        .then(data => resolve(data))
        .catch(this._checkAuthentication.bind(null, resolve, reject));
    });
  },

  getEndPoint(endpoint) {
    if (process.env.NODE_ENV === "development") {
      return `${DEV_END_POINT}/${endpoint}`;
    } else {
      let url = `${testing ? "http://localhost:9080" : ""}/${endpoint}`;
      return url;
    }
  },

  _makeRequest({ method, endpoint, body = {}, auth = null, parseJson = true }) {
    let url = this.getEndPoint(endpoint);

    if (!auth) {
      const user = JSON.parse(atob(window.localStorage.getItem("user")));
      auth = `${user.login}:${user.password}`;
    }

    const init = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(auth)}`
      },
      credentials: "include"
    };

    if (method === "GET") {
      if (Object.keys(body).length > 0) {
        var esc = encodeURIComponent;
        var query = Object.keys(body)
          .map(k => esc(k) + "=" + esc(body[k]))
          .join("&");
        url += `?${query}`;
      }
    } else {
      init.body = JSON.stringify(body);
    }

    let promise = fetch(url, init).then(this._checkStatus);
    if (parseJson) {
      promise = promise.then(this._parseJson);
    }

    return promise.then(this._logSuccess).catch(this._logError);
  },

  async _checkAuthentication(resolve, reject, response) {
    try {
      let data = await response.json();
      if (data.hasOwnProperty("message")) {
        return reject(new Error(data.message));
      }
      if (response && response.status === 401) {
        return reject(new Error("unauthorized"));
      } else if (response && response.status === 400) {
        return reject(new Error("bad request"));
      } else if (response && response.status === 403) {
        return reject(new Error("forbidden"));
      } else if (response && response.status === 404) {
        return reject(new Error("no results"));
      } else if (response && response.message === "Failed to fetch") {
        // tested with a request which does not respond ie. timeout
        // and so there is no response body as well
        // chrome error is "net::ERR_EMPTY_RESPONSE"
        return reject(new Error("timeout"));
      } else {
        return reject(new Error("something went wrong"));
      }
    } catch (e) {
      return reject(new Error("something went wrong"));
    }
  },

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },

  _parseJson(response) {
    return response.json();
  },

  _logError(response) {
    if (response && response.status === 401) {
      console.debug("Unauthorized request", response);
      return Promise.reject(response);
    } else {
      console.debug("Request failed", response);
      return Promise.reject(response);
    }
  },

  _logSuccess(data) {
    console.debug("Request succeeded with JSON response", data);
    return Promise.resolve(data);
  }
};

export default apiFetch;
