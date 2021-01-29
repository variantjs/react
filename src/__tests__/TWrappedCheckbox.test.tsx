import React from 'react';
import { shallow, mount } from 'enzyme';
import { Configuration, VariantJSConfiguration } from '../context/Configuration'
import TWrappedCheckbox, {classesListKeys} from '../components/TWrappedCheckbox';
import TWrappedCheckboxTheme from '../theme/TWrappedCheckbox'
import { CSSClassesList, pick } from '@variantjs/core'

const emptyClasses: CSSClassesList = classesListKeys.reduce((obj, key) => {
  obj[key] = ''
  return obj;
}, {} as CSSClassesList)

describe('TWrappedCheckbox', () => {
  it('renders the checkbox without errors', () => {
    const wrapper = shallow(<TWrappedCheckbox />)

    expect(wrapper).toBeTruthy()
  });

  it('has a default theme', () => {
    const wrapper = shallow(<TWrappedCheckbox />)

    const inputProps = wrapper.first().props();

    expect(inputProps.classesList).toEqual(pick(TWrappedCheckboxTheme.classes))
  });

  it('accepts checkbox html attributes', () => {
    const wrapper = shallow(<TWrappedCheckbox checked={true} readOnly={true} classes={emptyClasses} />)

    expect(wrapper.html()).toBe('<label><span><input type="checkbox" checked="" readonly=""/></span><span></span></label>')
  });
  
   it('only has the type="checkbox" attribute by default', () => {
    const wrapper = shallow(<TWrappedCheckbox classes={emptyClasses} />)

    expect(wrapper.html()).toBe('<label><span><input type="checkbox"/></span><span></span></label>')
  });
 
  it('select the props from the selected variant', () => {
    const variants = {
      error: {
        classes: {
          wrapper: 'text-red-500'
        },
        value: 'yesyes'
      }
    }

    const wrapper = shallow(<TWrappedCheckbox classes={{
      wrapper: 'text-black'
    }} variant="error" variants={variants} />)

    const inputProps = wrapper.first().props();

    expect(inputProps.classesList.wrapper).toBe('text-red-500')
    expect(inputProps.value).toBe('yesyes')
  });

  it('doesnt adds the props related with the variants', () => {
    const props = {
      fixedClasses: {
        wrapper: 'border'
      },
      classes: {
        wrapper: 'text-red-500'
      },
      variant: 'alt',
      variants: {
        alt: {
          classes: {
            wrapper: 'text-red-500'
          },
          type: 'text',
        }
      }
    }

    const wrapper = shallow(<TWrappedCheckbox {...props} />)
    const inputProps = wrapper.first().props();

    expect(inputProps.fixedClasses).toBeUndefined()
    expect(inputProps.classes).toBeUndefined()
    expect(inputProps.variant).toBeUndefined()
    expect(inputProps.variatns).toBeUndefined()
  });
  
  it('uses the props from the selected configuration variant', () => {
    const configuration: VariantJSConfiguration = {
      TWrappedCheckbox: {
        classes: {
          wrapper: 'text-black'
        },
        variants: {
          error: {
            value: 'yesyes',
            classes: {
              wrapper: 'text-red-500'
            },
          } 
        }
      }
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TWrappedCheckbox variant="error" />
      </Configuration.Provider>
    )

    // The label is the wrapper
    const wrapperProps = wrapper.find('label').props();
    const inputProps = wrapper.find('input').props();
    
    expect(wrapperProps.className).toBe('text-red-500')
    expect(inputProps.value).toBe('yesyes')
  });

  it('uses the props from the configuration', () => {
    const configuration: VariantJSConfiguration = {
      TWrappedCheckbox: {
        classes: {
          wrapper: 'text-black',
        },
        value: 'yesyes'
      }
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TWrappedCheckbox />
      </Configuration.Provider>
    )

    const wrapperProps = wrapper.find('label').props();
    const inputProps = wrapper.find('input').props();

    expect(wrapperProps.className).toBe('text-black')
    expect(inputProps.value).toBe('yesyes')
  });

  it('calls the input handler if set', () => {
    const changeHandler = jest.fn();
    
    const wrapper = mount(<TWrappedCheckbox changeHandler={changeHandler} value="hellooou" checked={true} />)

    wrapper.find('input').simulate('change')

    expect(changeHandler).toHaveBeenCalledWith('hellooou');
  });

  it('calls the input handler with the unchecked value if unchecked', () => {
    const changeHandler = jest.fn();
    
    const wrapper = mount(<TWrappedCheckbox changeHandler={changeHandler} value="hellooou" uncheckedValue="NOUP" checked={false} />)

    wrapper.find('input').simulate('change')

    expect(changeHandler).toHaveBeenCalledWith('NOUP');
  });

  it('accept and handle a react state with the checked value', () => {
    const setState = jest.fn();

    const wrapper = mount(<TWrappedCheckbox state={['', setState]} checked={true} value="hellooou" />)

    wrapper.find('input').simulate('change')

    expect(setState).toHaveBeenCalledWith('hellooou');
  });

  it('accept and handle a react state with the unchecked value', () => {
    const setState = jest.fn();

    const wrapper = mount(<TWrappedCheckbox state={['', setState]} value="hellooou" uncheckedValue="NOUP" checked={false} />)

    wrapper.find('input').simulate('change')

    expect(setState).toHaveBeenCalledWith('NOUP');
  });

  it('adds the tabindex to the wrapper and remove it from the input', () => {
    const wrapper = mount(<TWrappedCheckbox tabIndex={0} />)

    const wrapperProps = wrapper.find('label').props();
    const inputProps = wrapper.find('input').props();
    
    expect(wrapperProps.tabIndex).toBe(0)
    expect(inputProps.tabIndex).toBe(-1)
  });

  it('accepts a label prop that is used as the text of the input', () => {
    const wrapper = mount(<TWrappedCheckbox label="Check me" />)

    console.log(wrapper.ref('labelRef'))
    
    // expect(wrapper.text()).toBe(0)
    // expect(inputProps.tabIndex).toBe(-1)
  });


  it('uses the id as the htmlFor of the wrapper label', () => {
    expect(true).toBe(false)
  })
  
  it('accepts a custom wrapper tag', () => {
    expect(true).toBe(false)
  })
  it('accepts a custom label tag', () => {
    expect(true).toBe(false)
  })
  it('accepts a input wrapper tag', () => {
    expect(true).toBe(false)
  })
})


