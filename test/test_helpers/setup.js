// React & Enzyme
import React from 'react';
import { shallow, mount } from 'enzyme';

// Chai and Sinon
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy, stub } from 'sinon';
import sinonChai from 'sinon-chai';
import { spyOnComponentMethod, stubComponentMethod } from 'sinon-spy-react';

chai.use(chaiEnzyme());
chai.use(sinonChai);

export {
  React,
  shallow,
  mount,
  chai,
  expect,
  spy,
  stub,
  spyOnComponentMethod,
  stubComponentMethod
};
