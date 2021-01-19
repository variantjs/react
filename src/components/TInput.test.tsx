import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import TInput from './TInput';

import { Configuration, VariantJSConfiguration } from '../context/Configuration'

Enzyme.configure({ adapter: new EnzymeAdapter()})

describe('<TInput />', () => {
  it('renders the input withouth errors', () => {
    const wrapper = shallow(<TInput />)

    expect(wrapper).toBeTruthy()
  });
  
 it('doesnt have any attributes by default', () => {
    const wrapper = shallow(<TInput />)

    expect(wrapper.html()).toBe('<input/>')
  });
 
  it('select the props from the selected variant', () => {
    const variants = {
      error: {
        classes: 'text-red-500',
      }
    }

    const wrapper = shallow(<TInput classes="text-black" variant="error" variants={variants} />)
    expect(wrapper.find('input').props().className).toBe('text-red-500')
  });
  
  it('returns the default classes if no variant', () => {
    const variants = {
      error: {
        classes: 'text-red-500',
      }
    }

    const wrapper = shallow(<TInput classes="text-black" variants={variants}  />)
    expect(wrapper.find('input').props().className).toBe('text-black')
  });


  it('returns the default classes if invalid variant', () => {
    const wrapper = shallow(<TInput classes="text-black" variant="success" />)

    expect(wrapper.find('input').props().className).toBe('text-black')
  });

  it('accepts an invalid value for a variant', () => {
    const variants = {
      error: {
        classes: undefined,
      }
    }

    const wrapper = shallow(<TInput classes="text-black" variant="error" variants={variants} />)
    expect(wrapper.find('input').props().className).toBe('text-black')
  });

  it('uses the classes from the configuration', () => {
    const configuration: VariantJSConfiguration = {
      TInput: {
        classes: 'text-black'
      }
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TInput variant="error" />
      </Configuration.Provider>
    )

    expect(wrapper.find('input').props().className).toBe('text-black')
  });

  it('uses the classes from the selected configuration variant', () => {
    const configuration: VariantJSConfiguration = {
      TInput: {
        variants: {
          error: {
            classes: 'text-red-500'
          }
        }
      }
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TInput variant="error" />
      </Configuration.Provider>
    )

    expect(wrapper.find('input').props().className).toBe('text-red-500')
  });

  it('handles undefined variants from the configuration', () => {
    const configuration: VariantJSConfiguration = {
      TInput: {
        variants: {
          error: {
            classes: 'text-red-500'
          }
        }
      }
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TInput variant="success" />
      </Configuration.Provider>
    )

    expect(wrapper.find('input').props().className).toBeUndefined()
  });
})

