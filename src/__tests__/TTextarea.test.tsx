import React from 'react';
import { shallow, mount } from 'enzyme';
import { Configuration, VariantJSConfiguration } from '../context/Configuration'
import TTextarea from '../components/TTextarea';
import TTextareaTheme from '../theme/TTextarea'

describe('TTextarea', () => {
  it('renders the textarea without errors', () => {
    const wrapper = shallow(<TTextarea />)

    expect(wrapper).toBeTruthy()
  });

  it('has a default theme', () => {
    const wrapper = shallow(<TTextarea />)

    const inputProps = wrapper.first().props();

    expect(inputProps.className).toBe(TTextareaTheme.classes)
  });

  it('accepts textarea html attributes', () => {
    const wrapper = shallow(<TTextarea rows={3} cols={4} placeholder="Hello world" classes={undefined} />)

    expect(wrapper.html()).toBe('<textarea rows="3" cols="4" placeholder="Hello world"></textarea>')
  });
  
 it('doesnt have any attributes by default', () => {
    const wrapper = shallow(<TTextarea classes={undefined} />)

    expect(wrapper.html()).toBe('<textarea></textarea>')
  });
 
  it('select the props from the selected variant', () => {
    const variants = {
      error: {
        classes: 'text-red-500',
        rows: 4
      }
    }

    const wrapper = shallow(<TTextarea classes="text-black" variant="error" variants={variants} />)

    const inputProps = wrapper.first().props();

    expect(inputProps.className).toBe('text-red-500')
    expect(inputProps.rows).toBe(4)
  });

  it('doesnt adds the props related with the variants', () => {
    const props = {
      fixedClasses: 'border',
      classes: 'text-red-500',
      variant: 'alt',
      variants: {
        alt: {
          classes: 'text-blue-500',
          rows: 4,
        }
      }
    }

    const wrapper = shallow(<TTextarea {...props} />)
    const inputProps = wrapper.first().props();

    expect(inputProps.fixedClasses).toBeUndefined()
    expect(inputProps.classes).toBeUndefined()
    expect(inputProps.variant).toBeUndefined()
    expect(inputProps.variatns).toBeUndefined()
  });
  
  it('uses the props from the selected configuration variant', () => {
    const configuration: VariantJSConfiguration = {
      TTextarea: {
        classes: 'text-black',
        variants: {
          error: {
            rows: 4,
            classes: 'text-red-500'
          } 
        }
      }
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TTextarea variant="error" />
      </Configuration.Provider>
    )

    const inputProps = wrapper.find('textarea').props();

    expect(inputProps.className).toBe('text-red-500')
    expect(inputProps.rows).toBe(4)
  });

  it('uses the props from the configuration', () => {
    const configuration: VariantJSConfiguration = {
      TTextarea: {
        classes: 'text-black',
        rows: 4
        
      }
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TTextarea />
      </Configuration.Provider>
    )

    const inputProps = wrapper.find('textarea').props();

    expect(inputProps.className).toBe('text-black')
    expect(inputProps.rows).toBe(4)
  });

  it('calls the input handler if set', () => {
    const changeHandler = jest.fn();
    
    const wrapper = mount(<TTextarea changeHandler={changeHandler} value="hellooou" />)

    wrapper.first().simulate('change')

    expect(changeHandler).toHaveBeenCalledWith('hellooou');
  });

  it('accept and handle a react state', () => {
    const setState = jest.fn();

    const wrapper = mount(<TTextarea state={['hellooou', setState]} />)

    wrapper.first().simulate('change')

    expect(setState).toHaveBeenCalledWith('hellooou');
  });

  it('calls the on change event even if have a change handler', () => {
    const onChange = jest.fn();

    const wrapper = mount(<TTextarea changeHandler={() => {}} onChange={onChange} />)

    wrapper.first().simulate('change')

    expect(onChange).toHaveBeenCalled();
  })

  it('calls the on change event even if have a state', () => {
    const onChange = jest.fn();

    const state: [string, () => void] = ["unselected", () => {}]
    
    const wrapper = mount(<TTextarea state={state} onChange={onChange} />)

    wrapper.first().simulate('change')

    expect(onChange).toHaveBeenCalled();
  })
})

