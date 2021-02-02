import React from 'react'
import { shallow, mount } from 'enzyme'
import { Configuration, VariantJSConfiguration } from '../context/Configuration'
import { TWrappedCheckbox } from '../components/TWrappedCheckbox'
import { TWrappedCheckbox as TWrappedCheckboxTheme } from '../theme/TWrappedCheckbox'
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

describe('TWrappedCheckbox', () => {
  it('renders the checkbox without errors', () => {
    const wrapper = shallow(<TWrappedCheckbox />)

    expect(wrapper).toBeTruthy()
  })

  it('has a default theme', () => {
    const wrapper = shallow(<TWrappedCheckbox />)

    const inputProps = wrapper.first().props()

    expect(inputProps.classesList).toEqual(pick(TWrappedCheckboxTheme.classes))
  })

  it('accepts checkbox html attributes', () => {
    const wrapper = mount(
      <TWrappedCheckbox checked={true} readOnly={true} classes={emptyClasses} />
    )

    const props = wrapper.find('input').props()
    // For now im not considering this attribute
    delete props.onChange

    expect(props).toEqual({
      type: 'checkbox',
      tabIndex: undefined,
      checked: true,
      readOnly: true,
    })
  })

  it('only has the type="checkbox" attribute by default', () => {
    const wrapper = mount(<TWrappedCheckbox classes={emptyClasses} />)

    const props = wrapper.find('input').props()
    // For now im not considering this attribute
    delete props.onChange

    expect(props).toEqual({
      type: 'checkbox',
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
      <TWrappedCheckbox
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

    const wrapper = shallow(<TWrappedCheckbox {...props} />)
    const inputProps = wrapper.first().props()

    expect(inputProps.fixedClasses).toBeUndefined()
    expect(inputProps.classes).toBeUndefined()
    expect(inputProps.variant).toBeUndefined()
    expect(inputProps.variatns).toBeUndefined()
  })

  it('uses the props from the selected configuration variant', () => {
    const configuration: VariantJSConfiguration = {
      TWrappedCheckbox: {
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
        <TWrappedCheckbox variant='error' />
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
      TWrappedCheckbox: {
        classes: {
          wrapper: 'text-black',
        },
        value: 'yesyes',
      },
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TWrappedCheckbox />
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
      <TWrappedCheckbox changeHandler={changeHandler} value='hellooou' checked={true} />
    )

    wrapper.find('input').simulate('change')

    expect(changeHandler).toHaveBeenCalledWith('hellooou')
  })

  it('calls the input handler with the unchecked value if unchecked', () => {
    const changeHandler = jest.fn()

    const wrapper = mount(
      <TWrappedCheckbox
        changeHandler={changeHandler}
        value='hellooou'
        uncheckedValue='NOUP'
        checked={false}
      />
    )

    wrapper.find('input').simulate('change')

    expect(changeHandler).toHaveBeenCalledWith('NOUP')
  })

  it('handle a react state with the new value', () => {
    const setState = jest.fn()

    const wrapper = mount(<TWrappedCheckbox state={['hellooou', setState]} value='hellooou' />)

    wrapper.find('input').simulate('change')

    expect(setState).toHaveBeenCalledWith('hellooou')
  })

  it('accept and handle a react state with the unchecked value', () => {
    const setState = jest.fn()

    const wrapper = mount(
      <TWrappedCheckbox
        state={['', setState]}
        value='hellooou'
        uncheckedValue='NOUP'
        checked={false}
      />
    )

    wrapper.find('input').simulate('change')

    expect(setState).toHaveBeenCalledWith('NOUP')
  })

  it('adds the tabindex to the wrapper and remove it from the input', () => {
    const wrapper = mount(<TWrappedCheckbox tabIndex={0} />)

    const wrapperProps = wrapper.find('label').props()
    const inputProps = wrapper.find('input').props()

    expect(wrapperProps.tabIndex).toBe(0)
    expect(inputProps.tabIndex).toBe(-1)
  })

  it('accepts a label prop that is used as the text of the input', () => {
    const wrapper = mount(<TWrappedCheckbox label='Check me' />)

    expect(wrapper.byTestId('label').text()).toBe('Check me')
  })

  it('uses the children content as the label', () => {
    const wrapper = mount(<TWrappedCheckbox>Check me</TWrappedCheckbox>)

    expect(wrapper.byTestId('label').text()).toBe('Check me')
  })

  it('uses the id as the htmlFor of the wrapper label', () => {
    const wrapper = mount(<TWrappedCheckbox id='check' />)

    expect(wrapper.find('label').prop('htmlFor')).toBe('check')
  })

  it('accepts a custom wrapper tag', () => {
    const wrapper = mount(<TWrappedCheckbox wrapperTag='strong' />)

    expect(wrapper.byTestId('wrapper').is('strong')).toBe(true)
  })

  it('accepts a custom label tag', () => {
    const wrapper = mount(<TWrappedCheckbox labelTag='strong' />)

    expect(wrapper.byTestId('label').is('strong')).toBe(true)
  })

  it('accepts a input wrapper tag', () => {
    const wrapper = mount(<TWrappedCheckbox inputWrapperTag='strong' />)

    expect(wrapper.byTestId('inputWrapper').is('strong')).toBe(true)
  })

  it('set as not checked if checked false', () => {
    const wrapper = mount(<TWrappedCheckbox checked={false} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(false)
    expect(wrapper.find('input').prop('checked')).toBe(false)
  })

  it('set as checked if checked true', () => {
    const wrapper = mount(<TWrappedCheckbox checked={true} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(true)
    expect(wrapper.find('input').prop('checked')).toBe(true)
  })

  it('set as checked if the value is the same as the state and no checked attribute', () => {
    const state: [string, () => void] = ['selected', () => {}]

    const wrapper = mount(<TWrappedCheckbox value='selected' state={state} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(true)
  })

  it('set as the checked attribute if the value is different to the state', () => {
    const state: [string, () => void] = ['selected', () => {}]

    const wrapper = mount(<TWrappedCheckbox value='other' state={state} checked={true} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(true)
  })

  it('set as the checked attribute if the value is different to the state 2', () => {
    const state: [string, () => void] = ['selected', () => {}]

    const wrapper = mount(<TWrappedCheckbox value='other' state={state} checked={false} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(false)
  })

  it('set as undefined if the state is not the checked or the unchecked value', () => {
    const state: [string, () => void] = ['nopup', () => {}]

    const wrapper = mount(
      <TWrappedCheckbox value='selected' uncheckedValue='unselected' state={state} />
    )

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBeUndefined()
  })

  it('set as checked if the value is equal to the state even if has the checked attribute as false', () => {
    const state: [string, () => void] = ['selected', () => {}]

    const wrapper = mount(<TWrappedCheckbox value='selected' state={state} checked={false} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(true)
  })

  it('set as not checked if the uncheckedValue is equal to the state', () => {
    const state: [string, () => void] = ['unselected', () => {}]

    const wrapper = mount(
      <TWrappedCheckbox value='selected' uncheckedValue='unselected' state={state} />
    )

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(false)
  })

  it('set as not checked if the uncheckedValue is equal to the state even if the checked attribute is true', () => {
    const state: [string, () => void] = ['unselected', () => {}]

    const wrapper = mount(
      <TWrappedCheckbox value='selected' uncheckedValue='unselected' state={state} checked={true} />
    )

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(false)
  })

  it('updates the checked state', () => {
    const wrapper = mount(<TWrappedCheckbox checked={true} />)

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(true)

    wrapper.setProps({ checked: false })

    expect(wrapper.byTestId('wrapper').prop('data-checked')).toBe(false)
  })

  it('calls the on change event even if have a change handler', () => {
    const onChange = jest.fn()

    const wrapper = mount(<TWrappedCheckbox changeHandler={() => {}} onChange={onChange} />)

    wrapper.find('input').simulate('change')

    expect(onChange).toHaveBeenCalled()
  })

  it('calls the on change event even if have a state', () => {
    const onChange = jest.fn()

    const state: [string, () => void] = ['unselected', () => {}]

    const wrapper = mount(<TWrappedCheckbox state={state} onChange={onChange} />)

    wrapper.find('input').simulate('change')

    expect(onChange).toHaveBeenCalled()
  })

  it('will use the default classes if the wrapper is not checked', () => {
    const wrapper = mount(
      <TWrappedCheckbox
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
      <TWrappedCheckbox
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
