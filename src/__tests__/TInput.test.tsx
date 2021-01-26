import React from 'react';
import { shallow, mount } from 'enzyme';
import { Configuration, VariantJSConfiguration } from '../context/Configuration'
import TInput from '../components/TInput';
import TInputTheme from '../theme/TInput'

describe('TInput', () => {
  it('renders the input without errors', () => {
    const wrapper = shallow(<TInput />)

    expect(wrapper).toBeTruthy()
  });

  it('has a default theme', () => {
    const wrapper = shallow(<TInput />)

    const inputProps = wrapper.first().props();

    expect(inputProps.className).toBe(TInputTheme.classes)
  });

  it('accepts text input html attributes', () => {
    const wrapper = shallow(<TInput type="number" max="10" readOnly={true} placeholder="Hello world" classes={undefined} />)

    expect(wrapper.html()).toBe('<input type="number" max="10" readonly="" placeholder="Hello world"/>')
  });
  
 it('doesnt have any attributes by default', () => {
    const wrapper = shallow(<TInput classes={undefined} />)

    expect(wrapper.html()).toBe('<input/>')
  });
 
  it('select the props from the selected variant', () => {
    const variants = {
      error: {
        classes: 'text-red-500',
        type: 'number'
      }
    }

    const wrapper = shallow(<TInput classes="text-black" variant="error" variants={variants} />)

    const inputProps = wrapper.first().props();

    expect(inputProps.className).toBe('text-red-500')
    expect(inputProps.type).toBe('number')
  });

  it('doesnt adds the props related with the variants', () => {
    const props = {
      fixedClasses: 'border',
      classes: 'text-red-500',
      variant: 'alt',
      variants: {
        alt: {
          classes: 'text-blue-500',
          type: 'text',
        }
      }
    }

    const wrapper = shallow(<TInput {...props} />)
    const inputProps = wrapper.first().props();

    expect(inputProps.fixedClasses).toBeUndefined()
    expect(inputProps.classes).toBeUndefined()
    expect(inputProps.variant).toBeUndefined()
    expect(inputProps.variatns).toBeUndefined()
  });
  
  it('uses the props from the selected configuration variant', () => {
    const configuration: VariantJSConfiguration = {
      TInput: {
        classes: 'text-black',
        variants: {
          error: {
            type: 'number',
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

    const inputProps = wrapper.find('input').props();

    expect(inputProps.className).toBe('text-red-500')
    expect(inputProps.type).toBe('number')
  });

  it('uses the props from the configuration', () => {
    const configuration: VariantJSConfiguration = {
      TInput: {
        classes: 'text-black',
        type: 'number'
        
      }
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TInput />
      </Configuration.Provider>
    )

    const inputProps = wrapper.find('input').props();

    expect(inputProps.className).toBe('text-black')
    expect(inputProps.type).toBe('number')
  });


  it('calls the input handler if set', () => {
    const inputHandler = jest.fn();
    
    const wrapper = mount(<TInput inputHandler={inputHandler} value="hellooou" />)

    wrapper.first().simulate('input')

    expect(inputHandler).toHaveBeenCalledWith('hellooou');
  });
})

