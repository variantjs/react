import React from 'react';
import { shallow, mount } from 'enzyme';
import TButton from '../components/TButton';
import { Configuration, VariantJSConfiguration } from '../context/Configuration'
import TButtonTheme from '../theme/TButton'

describe('TButton', () => {
  it('renders the input without errors', () => {
    const wrapper = shallow(<TButton />)

    expect(wrapper).toBeTruthy()
  });

  it('has a default theme', () => {
    const wrapper = shallow(<TButton>Press me</TButton>)

    const inputProps = wrapper.first().props();

    expect(inputProps.className).toBe(TButtonTheme.classes)
  });

  it('accepts button html attributes', () => {
    const wrapper = shallow(<TButton type="submit" value="10" disabled classes={undefined}>Press me</TButton>)

    expect(wrapper.html()).toBe('<button type="submit" value="10" disabled="">Press me</button>')
  });
  
 it('doesnt have any attributes by default', () => {
    const wrapper = shallow(<TButton classes={undefined} />)

    expect(wrapper.html()).toBe('<button></button>')
  });
 
  it('select the props from the selected variant', () => {
    const variants = {
      error: {
        classes: 'text-red-500',
        type: 'submit'
      }
    }

    const wrapper = shallow(<TButton classes="text-black" variant="error" variants={variants} />)

    const inputProps = wrapper.first().props();

    expect(inputProps.className).toBe('text-red-500')
    expect(inputProps.type).toBe('submit')
  });

  it('doesnt adds the props related with the variants', () => {
    const props = {
      fixedClasses: 'border',
      classes: 'text-red-500',
      variant: 'alt',
      variants: {
        alt: {
          classes: 'text-blue-500',
          type: 'submit',
        }
      }
    }

    const wrapper = shallow(<TButton {...props} />)
    const inputProps = wrapper.first().props();

    expect(inputProps.fixedClasses).toBeUndefined()
    expect(inputProps.classes).toBeUndefined()
    expect(inputProps.variant).toBeUndefined()
    expect(inputProps.variatns).toBeUndefined()
  });
  
  it('uses the props from the selected configuration variant', () => {
    const configuration: VariantJSConfiguration = {
      TButton: {
        classes: 'text-black',
        variants: {
          error: {
            type: 'submit',
            classes: 'text-red-500'
          } 
        }
      }
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TButton variant="error" />
      </Configuration.Provider>
    )

    const inputProps = wrapper.find('button').props();

    expect(inputProps.className).toBe('text-red-500')
    expect(inputProps.type).toBe('submit')
  });

  it('uses the props from the configuration', () => {
    const configuration: VariantJSConfiguration = {
      TButton: {
        classes: 'text-black',
        type: 'submit'
        
      }
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TButton />
      </Configuration.Provider>
    )

    const inputProps = wrapper.find('button').props();

    expect(inputProps.className).toBe('text-black')
    expect(inputProps.type).toBe('submit')
  });
})

