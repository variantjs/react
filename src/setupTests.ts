import {
  AllHTMLAttributes as ReactHTMLAttributes,
  SVGAttributes as ReactSVGAttributes
} from 'react';

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import Enzyme, { ReactWrapper, ShallowWrapper } from 'enzyme';

import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

export type HTMLAttributes = ReactHTMLAttributes<{}> & ReactSVGAttributes<{}>;

Enzyme.configure({ adapter: new EnzymeAdapter()})

declare module "enzyme" {
  interface ReactWrapper {
    byTestId: (id: string) => ReactWrapper<HTMLAttributes, any>
  }

  interface ShallowWrapper {
    byTestId: (id: string) => ShallowWrapper<HTMLAttributes, any>
  }
}

ReactWrapper.prototype.byTestId = function (id: string) {
  return this.find(`[data-test-id="${id}"]`)
}

ShallowWrapper.prototype.byTestId =  function (id: string) {
  return this.find(`[data-test-id="${id}"]`)
}