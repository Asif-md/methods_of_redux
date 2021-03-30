const expectToBeAPromise = function expectToBeAPromise(chai, utils) {
  utils.addProperty(chai.Assertion.prototype, 'promise', function () {
    var subject = this._obj;

    var expectedMessage = `${subject} is a promise`;
    var notExpectedMessage = `expected ${subject} to be a promise`;

    const assertion = (subject.constructor.name === 'Promise' &&
                       typeof subject.then === 'function' &&
                       typeof subject.catch === 'function');

    this.assert(assertion, expectedMessage, notExpectedMessage);
  });
};

export default expectToBeAPromise;
