import chai, { expect } from 'chai';
import nock from 'nock';
import apiFetch from '../../app/utils/api_fetch';
import expectToBeAPromise from '../test_helpers/expect_to_be_a_promise';

chai.use(expectToBeAPromise);

const baseUrl = "http://localhost";

describe('apiFetch', () => {
  const body = { ping: "pong" };
  const jsonResponse = '{ "msg": "Hello from phonepe!" }';

  beforeEach(() => {
    if(typeof window !== 'undefined') {
      global = window;
    }

    function mockStorage() {
      var storage = {};
      return {
        setItem: function(key, value) {
          storage[key] = value || '';
        },
        getItem: function(key) {
          return storage[key];
        },
        removeItem: function(key) {
          delete storage[key];
        }
      };
    }

    global['sessionStorage'] = mockStorage();
    console.debug = () => {};
    window.sessionStorage.setItem("user", JSON.stringify({ login: "user", password: "password" }));
  });

  // Start apiFetch#post
  describe('#post()', () => {
    it('return a promise', () => {
      expect(apiFetch.post("merchant")).to.be.a.promise;
    });

    it('should make a POST http call', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/merchant')
            .reply(200, jsonResponse);

      apiFetch.post("merchant");

      mock.done();
      done();
    });

    it('should have Accept, Content-Type and Authorization headers', (done) => {
      const mock = nock(`${baseUrl}/v1`, {
        reqheaders: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Basic ${btoa("user:password")}`
        }
      }).post('/merchant').reply(200, jsonResponse);

      apiFetch.post("merchant");

      mock.done();
      done();
    });

    it('should have a json body', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/merchant', body)
            .reply(200, jsonResponse);

      apiFetch.post("merchant", body);

      mock.done();
      done();
    });

    it('resolves the promise if status between 200 and 300', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/merchant')
            .reply(200, jsonResponse);

      const promise = apiFetch.post("merchant");
      mock.done();

      promise
        .then((data) => done())
        .catch((response) => done("expected to resolve promise for a 200 OK"));
    });

    it('rejects the promise if status not between 200 and 300', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/merchant')
            .reply(401, jsonResponse);

      const promise = apiFetch.post("merchant");
      mock.done();

      promise
        .then((data) => done("expected to reject promise for a 401 UNAUTHORIZED"))
        .catch((response) => done());
    });

    it('rejects the promise if response has invalid json', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/merchant')
            .reply(200, "response is not json");

      const promise = apiFetch.post("merchant");
      mock.done();

      promise
        .then((data) => done("expected to reject promise for an invalid json response"))
        .catch((response) => done());
    });

    it('parses the response json', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/merchant')
            .reply(200, jsonResponse);

      const promise = apiFetch.post("merchant");

      promise
        .then((data) => {
          expect(data).to.deep.equal({ "msg": "Hello from phonepe!" });
        })
        .catch((err) => done(err));

      mock.done();
      done();
    });
  });

  // Start apiFetch#put
  describe('#put()', () => {
    it('return a promise', () => {
      expect(apiFetch.put("merchant")).to.be.a.promise;
    });

    it('should make a PUT http call', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .put('/merchant')
            .reply(200, jsonResponse);

      apiFetch.put("merchant");

      mock.done();
      done();
    });

    it('should have Accept, Content-Type and Authorization headers', (done) => {
      const mock = nock(`${baseUrl}/v1`, {
        reqheaders: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Basic ${btoa("user:password")}`
        }
      }).put('/merchant').reply(200, jsonResponse);

      apiFetch.put("merchant");

      mock.done();
      done();
    });

    it('should have a json body', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .put('/merchant', body)
            .reply(200, jsonResponse);

      apiFetch.put("merchant", body);

      mock.done();
      done();
    });

    it('resolves the promise if status between 200 and 300', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .put('/merchant')
            .reply(200, jsonResponse);

      const promise = apiFetch.put("merchant");
      mock.done();

      promise
        .then((data) => done())
        .catch((response) => done("expected to resolve promise for a 200 OK"));
    });

    it('rejects the promise if status not between 200 and 300', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .put('/merchant')
            .reply(401, jsonResponse);

      const promise = apiFetch.put("merchant");
      mock.done();

      promise
        .then((data) => done("expected to reject promise for a 401 UNAUTHORIZED"))
        .catch((response) => done());
    });

    it('rejects the promise if response has invalid json', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .put('/merchant')
            .reply(200, "response is not json");

      const promise = apiFetch.put("merchant");
      mock.done();

      promise
        .then((data) => done("expected to reject promise for an invalid json response"))
        .catch((response) => done());
    });

    it('parses the response json', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .put('/merchant')
            .reply(200, jsonResponse);

      const promise = apiFetch.put("merchant");

      promise
        .then((data) => {
          expect(data).to.deep.equal({ "msg": "Hello from phonepe!" });
        })
        .catch((err) => done(err));

      mock.done();
      done();
    });
  });

  // Start apiFetch#postQuick
  describe('#postQuick()', () => {
    const auth = "manager:password";
    beforeEach(() => {
      window.sessionStorage.setItem("user", JSON.stringify({ login: "stored-user", password: "password" }));
    });

    it('return a promise', () => {
      expect(apiFetch.postQuick({
        endpoint: "merchant",
        auth
      })).to.be.a.promise;
    });

    it('should make a POST http call', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/merchant')
            .reply(200, jsonResponse);

      apiFetch.postQuick({
        endpoint: "merchant",
        auth
      });

      mock.done();
      done();
    });

    it('should have Accept, Content-Type and Authorization headers', (done) => {
      const mock = nock(`${baseUrl}/v1`, {
        reqheaders: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Basic ${btoa(auth)}`
        }
      }).post('/merchant').reply(200, jsonResponse);

      apiFetch.postQuick({
        endpoint: "merchant",
        auth
      });

      mock.done();
      done();
    });

    it('should have a json body', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/merchant', body)
            .reply(200, jsonResponse);

      apiFetch.postQuick({
        endpoint: "merchant",
        auth,
        body
      });

      mock.done();
      done();
    });

    it('resolves the promise if status between 200 and 300', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/merchant')
            .reply(200, jsonResponse);

      const promise = apiFetch.postQuick({
        endpoint: "merchant",
        auth
      });
      mock.done();

      promise
        .then((data) => done())
        .catch((response) => done("expected to resolve promise for a 200 OK"));
    });

    it('rejects the promise if status not between 200 and 300', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/merchant')
            .reply(401, jsonResponse);

      const promise = apiFetch.postQuick({
        endpoint: "merchant",
        auth
      });
      mock.done();

      promise
        .then((data) => done("expected to reject promise for a 401 UNAUTHORIZED"))
        .catch((response) => done());
    });

    it('does not reject the promise if response has invalid json', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/merchant')
            .reply(200, "response is not json");

      const promise = apiFetch.postQuick({
        endpoint: "merchant",
        auth
      });
      mock.done();

      promise
        .then((data) => done())
        .catch((response) => done("should not reject promise"));
    });

    it('does not parse the response json', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/merchant')
            .reply(200, jsonResponse);

      const promise = apiFetch.postQuick({
        endpoint: "merchant",
        auth
      });

      promise
        .then((data) => {
          expect(data).not.to.deep.equal({ "msg": "Hello from phonepe!" });
        })
        .catch((err) => done(err));

      mock.done();
      done();
    });
  });

  // Start apiFetch#get
  describe('#get()', () => {
    it('return a promise', () => {
      expect(apiFetch.get("merchant")).to.be.a.promise;
    });

    it('should make a GET http call', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .get('/merchant')
            .reply(200, jsonResponse);

      apiFetch.get("merchant");

      mock.done();
      done();
    });

    it('should make a GET http call with a param', (done) => {
      const mock = nock(`${baseUrl}/v1`)
              .get('/merchant?msg=foo%20bar')
              .reply(200, jsonResponse);

      apiFetch.get("merchant", {msg: "foo bar"});

      mock.done();
      done();
    });

    it('should make a GET http call with multiple params', (done) => {
      const mock = nock(`${baseUrl}/v1`)
              .get('/merchant?count=10&msg=foo%20bar')
              .reply(200, jsonResponse);

      apiFetch.get("merchant", {count: 10, msg: "foo bar"});

      mock.done();
      done();
    });

    it('should have Accept and Authorization headers', (done) => {
      const mock = nock(`${baseUrl}/v1`, {
        reqheaders: {
          "Accept": "application/json",
          "Authorization": `Basic ${btoa("user:password")}`
        }
      }).get('/merchant').reply(200, jsonResponse);

      apiFetch.get("merchant");

      mock.done();
      done();
    });

    it('resolves the promise if status between 200 and 300', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .get('/merchant')
            .reply(200, jsonResponse);

      const promise = apiFetch.get("merchant");
      mock.done();

      promise
        .then((data) => done())
        .catch((response) => done("expected to resolve promise for a 200 OK"));
    });

    it('rejects the promise if status not between 200 and 300', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .get('/merchant')
            .reply(401, jsonResponse);

      const promise = apiFetch.get("merchant");
      mock.done();

      promise
        .then((data) => done("expected to reject promise for a 401 UNAUTHORIZED"))
        .catch((response) => done());
    });

    it('rejects the promise if response has invalid json', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .get('/merchant')
            .reply(200, "response is not json");

      const promise = apiFetch.get("merchant");
      mock.done();

      promise
        .then((data) => done("expected to reject promise for an invalid json response"))
        .catch((response) => done());
    });

    it('parses the response json', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .get('/merchant')
            .reply(200, jsonResponse);

      const promise = apiFetch.get("merchant");

      promise
        .then((data) => {
          expect(data).to.deep.equal({ "msg": "Hello from phonepe!" });
        })
        .catch((err) => done(err));

      mock.done();
      done();
    });
  });

  // Start apiFetch#createRule
  describe('#createRule()', () => {
    const rule = {
      rulesetId: "rulesetId",
      name: "rule"
    };

    it('resolves the promise if request is ok', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/rules')
            .reply(200, jsonResponse);

      const promise = apiFetch.createRule("rules",
                                          rule.rulesetId, rule);
      mock.done();

      promise
        .then((data) => done())
        .catch((response) => done("expected to resolve promise for a 200 OK"));
    });

    // TODO: mock with actual unauthorized response
    it('throws error if request is unauthorized', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/rules')
            .reply(401, { error: "something", code: "VH100" } );

      const promise = apiFetch.createRule("rules",
                                          rule.rulesetId, rule);
      mock.done();

      promise
        .then((data) => done("expected to reject promise for a 401 UNAUTHORIZED"))
        .catch((err) => {
          expect(err).to.be.an('error');
          expect(err.message).to.be.equal('unauthorized');
          done();
        })
        .catch((err) => {
          done(err)
        });
    });

    // TODO: mock with actual unauthorized response
    it('throws error if request is not ok', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .post('/rules')
            .reply(500, { error: "something", code: "VH400" } );

      const promise = apiFetch.createRule("rules",
                                          rule.rulesetId, rule);
      mock.done();

      promise
        .then((data) => done("expected to reject promise for a 500 INTERNAL SERVER ERROR"))
        .catch((err) => {
          expect(err).to.be.an('error');
          expect(err.message).to.be.equal('something went wrong');
          done();
        })
        .catch((err) => {
          done(err)
        });
    });
  });

  // Start apiFetch#authenticatedGet
  describe('#authenticatedGet()', () => {
    it('resolves the promise if request is ok', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .get('/merchant')
            .reply(200, jsonResponse);

      const promise = apiFetch.authenticatedGet("merchant");
      mock.done();

      promise
        .then((data) => done())
        .catch((response) => done("expected to resolve promise for a 200 OK"));
    });

    // TODO: mock with actual unauthorized response
    it('throws error if request is unauthorized', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .get('/merchant')
            .reply(401, { error: "something", code: "VH100" } );

      const promise = apiFetch.authenticatedGet("merchant");
      mock.done();

      promise
        .then((data) => done("expected to reject promise for a 401 UNAUTHORIZED"))
        .catch((err) => {
          expect(err).to.be.an('error');
          expect(err.message).to.be.equal('unauthorized');
          done();
        })
        .catch((err) => {
          done(err)
        });
    });

    // TODO: mock with actual unauthorized response
    it('throws error if request is not ok', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .get('/merchant')
            .reply(500, { error: "something", code: "VH400" } );

      const promise = apiFetch.authenticatedGet("merchant");
      mock.done();

      promise
        .then((data) => done("expected to reject promise for a 500 INTERNAL SERVER ERROR"))
        .catch((err) => {
          expect(err).to.be.an('error');
          expect(err.message).to.be.equal('something went wrong');
          done();
        })
        .catch((err) => {
          done(err)
        });
    });
  });

  // Start apiFetch#authenticatedPut
  describe('#authenticatedPut()', () => {
    it('resolves the promise if request is ok', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .put('/merchant')
            .reply(200, jsonResponse);

      const promise = apiFetch.authenticatedPut("merchant");
      mock.done();

      promise
        .then((data) => done())
        .catch((response) => done("expected to resolve promise for a 200 OK"));
    });

    // TODO: mock with actual unauthorized response
    it('throws error if request is unauthorized', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .put('/merchant')
            .reply(401, { error: "something", code: "VH100" } );

      const promise = apiFetch.authenticatedPut("merchant");
      mock.done();

      promise
        .then((data) => done("expected to reject promise for a 401 UNAUTHORIZED"))
        .catch((err) => {
          expect(err).to.be.an('error');
          expect(err.message).to.be.equal('unauthorized');
          done();
        })
        .catch((err) => {
          done(err)
        });
    });

    // TODO: mock with actual unauthorized response
    it('throws error if request is not ok', (done) => {
      const mock = nock(`${baseUrl}/v1`)
            .put('/merchant')
            .reply(500, { error: "something", code: "VH400" } );

      const promise = apiFetch.authenticatedPut("merchant");
      mock.done();

      promise
        .then((data) => done("expected to reject promise for a 500 INTERNAL SERVER ERROR"))
        .catch((err) => {
          expect(err).to.be.an('error');
          expect(err.message).to.be.equal('something went wrong');
          done();
        })
        .catch((err) => {
          done(err)
        });
    });
  });
});
