import { expect } from 'chai';
import * as validators from 'utils/validations';

describe('validations', () => {
  describe('EMAIL_REGEX', () => {
    const emailRegex = new RegExp(validators.EMAIL_REGEX);

    it("matches an email", () => {
      expect("foo@example.com").to.match(emailRegex);
      expect("foo").to.not.match(emailRegex);
      expect("foo.").to.not.match(emailRegex);
      expect("foo@example").to.not.match(emailRegex);
      expect("foo@example.").to.not.match(emailRegex);
    });
  });
});
