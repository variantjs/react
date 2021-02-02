import React from 'react'
import { shallow, mount } from 'enzyme'
import { Configuration, VariantJSConfiguration } from '../context/Configuration'
import { TWrappedRadio } from '../components/TWrappedRadio'
import { TWrappedRadio as TWrappedRadioTheme } from '../theme/TWrappedRadio'
import { CSSClassesList, pick } from '@variantjs/core'

const classesListKeys = [
  'wrapper',
  'wrapperChecked',
  'inputWrapper',
  'inputWrapperChecked',
  'input',
  'label',
  'labelChecked',
]

const emptyClasses: CSSClassesList = classesListKeys.reduce((obj, key) => {
  obj[key] = ''
  return obj
}, {} as CSSClassesList)

describe('TWrappedRadio', () => {
  it('renders the radio wrapper without errors', () => {
    const wrapper = shallow(<TWrappedRadio />)

    expect(wrapper).toBeTruthy()
  })

  it('has a default theme', () => {
    const wrapper = shallow(<TWrappedRadio />)

    const inputProps = wrapper.first().props()

    expect(inputProps.classesList).toEqual(pick(TWrappedRadioTheme.classes))
  })

  it('accepts radio input attributes', () => {
    const wrapper = mount(<TWrappedRadio checked={true} readOnly={true} classes={emptyClasses} />)

    const props = wrapper.find('input').props()
    // For now im not considering this attribute
    delete props.onChange

    expect(props).toEqual({
      type: 'radio',
      tabIndex: undefined,
      checked: true,
      readOnly: true,
    })
  })

  it('only has the type="radio" attribute by default', () => {
    const wrapper = mount(<TWrappedRadio classes={emptyClasses} />)

    const props = wrapper.find('input').props()
    // For now im not considering this attribute
    delete props.onChange

    expect(props).toEqual({
      type: 'radio',
      tabIndex: undefined,
    })
  })

  it('select the props from the selected variant', () => {
    const variants = {
      error: {
        classes: {
          wrapper: 'text-red-500',
        },
        value: 'yesyes',
      },
    }

    const wrapper = shallow(
      <TWrappedRadio
        classes={{
          wrapper: 'text-black',
        }}
        variant='error'
        variants={variants}
      />
    )

    const inputProps = wrapper.first().props()

    expect(inputProps.classesList.wrapper).toBe('text-red-500')
    expect(inputProps.value).toBe('yesyes')
  })

  it('doesnt adds the props related with the variants', () => {
    const props = {
      fixedClasses: {
        wrapper: 'border',
      },
      classes: {
        wrapper: 'text-red-500',
      },
      variant: 'alt',
      variants: {
        alt: {
          classes: {
            wrapper: 'text-red-500',
          },
          type: 'text',
        },
      },
    }

    const wrapper = shallow(<TWrappedRadio {...props} />)
    const inputProps = wrapper.first().props()

    expect(inputProps.fixedClasses).toBeUndefined()
    expect(inputProps.classes).toBeUndefined()
    expect(inputProps.variant).toBeUndefined()
    expect(inputProps.variatns).toBeUndefined()
  })

  it('uses the props from the selected configuration variant', () => {
    const configuration: VariantJSConfiguration = {
      TWrappedRadio: {
        classes: {
          wrapper: 'text-black',
        },
        variants: {
          error: {
            value: 'yesyes',
            classes: {
              wrapper: 'text-red-500',
            },
          },
        },
      },
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TWrappedRadio variant='error' />
      </Configuration.Provider>
    )

    // The label is the wrapper
    const wrapperProps = wrapper.find('label').props()
    const inputProps = wrapper.find('input').props()

    expect(wrapperProps.className).toBe('text-red-500')
    expect(inputProps.value).toBe('yesyes')
  })

  it('uses the props from the configuration', () => {
    const configuration: VariantJSConfiguration = {
      TWrappedRadio: {
        classes: {
          wrapper: 'text-black',
        },
        value: 'yesyes',
      },
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TWrappedRadio />
      </Configuration.Provider>
    )

    const wrapperProps = wrapper.find('label').props()
    const inputProps = wrapper.find('input').props()

    expect(wrapperProps.className).toBe('text-black')
    expect(inputProps.value).toBe('yesyes')
  })

  it('calls the input handler if set', () => {
    const changeHandler = jest.fn()

    const wrapper = mount(
      <TWrappedRadio changeHandler={changeHandler} value='hellooou' checked={true} />
    )

    wrapper.find('input').simulate('change')

    expect(changeHandler).toHaveBeenCalledWith('hellooou')
  })

  it('calls the input handler with the undefined if unchecked', () => {
    const changeHandler = jest.fn()

    const wrapper = mount(
      <TWrappedRadio changeHandler={changeHandler} value='hellooou' checked={false} />
    )

    wrapper.find('input').simulate('change')

    expect(changeHandler).toHaveBeenCalledWith(undefined)
  })

  it('handle a react state with the new value', () => {
    const setState = jest.fn()

    const wrapper = mount(<TWrappedRadio state={['hellooou', setState]} value='hellooou' />)

    wrapper.find('input').simulate('change')

    expect(setState).toHaveBeenCalledWith('hellooou')
  })

  it('accept and handle a react state when unchecked', () => {
    const setState = jest.fn()

    const wrapper = mount(<TWrappedRadio state={['', setState]} value='hellooou' checked={false} />)

    wrapper.find('input').simulate('change')

    expect(setState).toHaveBeenCalledWith(undefined)
  })

  it('adds the tabindex to the wrapper and remove it from the input', () => {
    const wrapper = mount(<TWrappedRadio tabIndex={0} />)

    const wrapperProps = wrapper.find('label').props()
    const inputProps = wrapper.find('input').props()

    expect(wrapperProps.tabIndex).toBe(0)
    expect(inputProps.tabIndex).toBe(-1)
  })

  it('accepts a label prop that is used as the text of the input', () => {
    const wrapper = mount(<TWrappedRadio label='Select me' />)

    expect(wrapper.byTestId('label').text()).toBe('Select me')
  })

  it('uses the children content as the label', () => {
    const wrapper = mount(<TWrappedRadio>Select me</TWrappedRadio>)

    expect(wrapper.byTestId('label').text()).toBe('Select me')
  })

  it('uses the id as the htmlFor of the wrapper label', () => {
    const wrapper = mount(<TWrappedRadio id='check' />)

    expect(wrapper.find('label').prop('htmlFor')).toBe('check')
  })

  it('accepts a custom wrapper tag', () => {
    const wrapper = mount(<TWrappedRadio wrapperTag='strong' />)

    expect(wrapper.byTestId('wrapper').is('strong')).toBe(true)
  })

  it('accepts a custom label tag', () => {
    const wrapper = mount(<TWrappedRadio labelTag='strong' />)

    expect(wrapper.byTestId('label').is('strong')).toBe(true)
  })

  it('accepts a input wrapper tag', () => {
    const wrapper = mount(<TWrappedRadio inputWrapperTag='strong' />)

    expect(wrapper.byTestId('inputWrapper').is('strong')).toBe(true)
  })

  it('set as not checked if checked false', () => {
    const wrapper = mount(<TWrappedRadio checked={false} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(false)
    expect(wrapper.find('input').prop('checked')).toBe(false)
  })

  it('set as checked if checked true', () => {
    const wrapper = mount(<TWrappedRadio checked={true} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(true)
    expect(wrapper.find('input').prop('checked')).toBe(true)
  })

  it('set as checked if the value is the same as the state and no checked attribute', () => {
    const state: [string, () => void] = ['selected', () => {}]

    const wrapper = mount(<TWrappedRadio value='selected' state={state} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(true)
  })

  it('set as the checked attribute if the value is different to the state', () => {
    const state: [string, () => void] = ['selected', () => {}]

    const wrapper = mount(<TWrappedRadio value='other' state={state} checked={true} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(true)
  })

  it('set as the checked attribute if the value is different to the state 2', () => {
    const state: [string, () => void] = ['selected', () => {}]

    const wrapper = mount(<TWrappedRadio value='other' state={state} checked={false} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(false)
  })

  it('set as not checked if the state is different to the value', () => {
    const state: [string, () => void] = ['nopup', () => {}]

    const wrapper = mount(<TWrappedRadio value='selected' state={state} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(false)
  })

  it('set as checked if the value is equal to the state even if has the checked attribute as false', () => {
    const state: [string, () => void] = ['selected', () => {}]

    const wrapper = mount(<TWrappedRadio value='selected' state={state} checked={false} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(true)
  })

  it('updates the checked state', () => {
    const wrapper = mount(<TWrappedRadio checked={true} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(true)

    wrapper.setProps({ checked: false })

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(false)
  })

  it('calls the on change event even if have a change handler', () => {
    const onChange = jest.fn()

    const wrapper = mount(<TWrappedRadio changeHandler={() => {}} onChange={onChange} />)

    wrapper.find('input').simulate('change')

    expect(onChange).toHaveBeenCalled()
  })

  it('calls the on change event even if have a state', () => {
    const onChange = jest.fn()

    const state: [string, () => void] = ['unselected', () => {}]

    const wrapper = mount(<TWrappedRadio state={state} onChange={onChange} />)

    wrapper.find('input').simulate('change')

    expect(onChange).toHaveBeenCalled()
  })

  it('will use the default classes if the wrapper is not checked', () => {
    const wrapper = mount(
      <TWrappedRadio
        classes={{
          wrapper: 'wrapper-class',
          inputWrapper: 'input-wrapper-class',
          label: 'label-class',
          input: 'input-class',
          wrapperChecked: 'wrapper-checked-class',
          inputWrapperChecked: 'input-wrapper-checked-class',
          labelChecked: 'label-checked-class',
        }}
        onChange={() => {}}
      />
    )

    expect(wrapper.byTestId('wrapper').prop('className')).toBe('wrapper-class')
    expect(wrapper.byTestId('label').prop('className')).toBe('label-class')
    expect(wrapper.byTestId('inputWrapper').prop('className')).toBe('input-wrapper-class')
  })

  it('will use the "checked" classes if the wrapper is checked', () => {
    const wrapper = mount(
      <TWrappedRadio
        classes={{
          wrapper: 'wrapper-class',
          inputWrapper: 'input-wrapper-class',
          label: 'label-class',
          input: 'input-class',
          wrapperChecked: 'wrapper-checked-class',
          inputWrapperChecked: 'input-wrapper-checked-class',
          labelChecked: 'label-checked-class',
        }}
        checked
        onChange={() => {}}
      />
    )

    expect(wrapper.byTestId('wrapper').prop('className')).toBe('wrapper-checked-class')
    expect(wrapper.byTestId('label').prop('className')).toBe('label-checked-class')
    expect(wrapper.byTestId('inputWrapper').prop('className')).toBe('input-wrapper-checked-class')
  })
})
