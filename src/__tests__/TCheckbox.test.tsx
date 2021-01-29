import React from 'react';
import { shallow, mount } from 'enzyme';
import { Configuration, VariantJSConfiguration } from '../context/Configuration'
import TCheckbox from '../components/TCheckbox';
import TCheckboxTheme from '../theme/TCheckbox'

describe('TCheckbox', () => {
  it('renders the checkbox without errors', () => {
    const wrapper = shallow(<TCheckbox />)

    expect(wrapper).toBeTruthy()
  });

  it('has a default theme', () => {
    const wrapper = shallow(<TCheckbox />)

    const inputProps = wrapper.first().props();

    expect(inputProps.className).toBe(TCheckboxTheme.classes)
  });

  it('accepts checkbox html attributes', () => {
    const wrapper = shallow(<TCheckbox checked={true} readOnly={true} classes={undefined} />)

    expect(wrapper.html()).toBe('<input type="checkbox" checked="" readonly=""/>')
  });
  
 it('only has the type="checkbox" attribute by default', () => {
    const wrapper = shallow(<TCheckbox classes={undefined} />)

    expect(wrapper.html()).toBe('<input type="checkbox"/>')
  });
 
  it('select the props from the selected variant', () => {
    const variants = {
      error: {
        classes: 'text-red-500',
        value: 'yesyes'
      }
    }

    const wrapper = shallow(<TCheckbox classes="text-black" variant="error" variants={variants} />)

    const inputProps = wrapper.first().props();

    expect(inputProps.className).toBe('text-red-500')
    expect(inputProps.value).toBe('yesyes')
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

    const wrapper = shallow(<TCheckbox {...props} />)
    const inputProps = wrapper.first().props();

    expect(inputProps.fixedClasses).toBeUndefined()
    expect(inputProps.classes).toBeUndefined()
    expect(inputProps.variant).toBeUndefined()
    expect(inputProps.variatns).toBeUndefined()
  });
  
  it('uses the props from the selected configuration variant', () => {
    const configuration: VariantJSConfiguration = {
      TCheckbox: {
        classes: 'text-black',
        variants: {
          error: {
            value: 'yesyes',
            classes: 'text-red-500'
          } 
        }
      }
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TCheckbox variant="error" />
      </Configuration.Provider>
    )

    const inputProps = wrapper.find('input').props();

    expect(inputProps.className).toBe('text-red-500')
    expect(inputProps.value).toBe('yesyes')
  });

  it('uses the props from the configuration', () => {
    const configuration: VariantJSConfiguration = {
      TCheckbox: {
        classes: 'text-black',
        value: 'yesyes'
      }
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TCheckbox />
      </Configuration.Provider>
    )

    const inputProps = wrapper.find('input').props();

    expect(inputProps.className).toBe('text-black')
    expect(inputProps.value).toBe('yesyes')
  });

  it('calls the input handler if set', () => {
    const changeHandler = jest.fn();
    
    const wrapper = mount(<TCheckbox changeHandler={changeHandler} value="hellooou" checked={true} />)

    wrapper.first().simulate('change')

    expect(changeHandler).toHaveBeenCalledWith('hellooou');
  });

  it('calls the input handler with the unchecked value if unchecked', () => {
    const changeHandler = jest.fn();
    
    const wrapper = mount(<TCheckbox changeHandler={changeHandler} value="hellooou" uncheckedValue="NOUP" checked={false} />)

    wrapper.first().simulate('change')

    expect(changeHandler).toHaveBeenCalledWith('NOUP');
  });

  it('accept and handle a react state with the checked value', () => {
    const setState = jest.fn();

    const wrapper = mount(<TCheckbox state={['', setState]} checked={true} value="hellooou" />)

    wrapper.first().simulate('change')

    expect(setState).toHaveBeenCalledWith('hellooou');
  });

  it('accept and handle a react state with the unchecked value', () => {
    const setState = jest.fn();

    const wrapper = mount(<TCheckbox state={['', setState]} value="hellooou" uncheckedValue="NOUP" checked={false} />)

    wrapper.first().simulate('change')

    expect(setState).toHaveBeenCalledWith('NOUP');
  });
})

