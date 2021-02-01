import React from 'react'
import { shallow, mount } from 'enzyme'
import { Configuration, VariantJSConfiguration } from '../context/Configuration'
import TRadio from '../components/TRadio'
import TRadioTheme from '../theme/TRadio'

describe('TRadio', () => {
  it('renders the checkbox without errors', () => {
    const wrapper = shallow(<TRadio />)

    expect(wrapper).toBeTruthy()
  })

  it('has a default theme', () => {
    const wrapper = shallow(<TRadio />)

    const inputProps = wrapper.first().props()

    expect(inputProps.className).toBe(TRadioTheme.classes)
  })

  it('accepts radio attributes', () => {
    const wrapper = shallow(<TRadio checked={true} readOnly={true} classes={undefined} />)

    expect(wrapper.html()).toBe('<input type="radio" checked="" readonly=""/>')
  })

  it('only has the type="radio" attribute by default', () => {
    const wrapper = shallow(<TRadio classes={undefined} />)

    expect(wrapper.html()).toBe('<input type="radio"/>')
  })

  it('select the props from the selected variant', () => {
    const variants = {
      error: {
        classes: 'text-red-500',
        value: 'yesyes',
      },
    }

    const wrapper = shallow(<TRadio classes='text-black' variant='error' variants={variants} />)

    const inputProps = wrapper.first().props()

    expect(inputProps.className).toBe('text-red-500')
    expect(inputProps.value).toBe('yesyes')
  })

  it('doesnt adds the props related with the variants', () => {
    const props = {
      fixedClasses: 'border',
      classes: 'text-red-500',
      variant: 'alt',
      variants: {
        alt: {
          classes: 'text-blue-500',
          type: 'text',
        },
      },
    }

    const wrapper = shallow(<TRadio {...props} />)
    const inputProps = wrapper.first().props()

    expect(inputProps.fixedClasses).toBeUndefined()
    expect(inputProps.classes).toBeUndefined()
    expect(inputProps.variant).toBeUndefined()
    expect(inputProps.variatns).toBeUndefined()
  })

  it('uses the props from the selected configuration variant', () => {
    const configuration: VariantJSConfiguration = {
      TRadio: {
        classes: 'text-black',
        variants: {
          error: {
            value: 'yesyes',
            classes: 'text-red-500',
          },
        },
      },
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TRadio variant='error' />
      </Configuration.Provider>
    )

    const inputProps = wrapper.find('input').props()

    expect(inputProps.className).toBe('text-red-500')
    expect(inputProps.value).toBe('yesyes')
  })

  it('uses the props from the configuration', () => {
    const configuration: VariantJSConfiguration = {
      TRadio: {
        classes: 'text-black',
        value: 'yesyes',
      },
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TRadio />
      </Configuration.Provider>
    )

    const inputProps = wrapper.find('input').props()

    expect(inputProps.className).toBe('text-black')
    expect(inputProps.value).toBe('yesyes')
  })

  it('calls the input handler if set', () => {
    const changeHandler = jest.fn()

    const wrapper = mount(<TRadio changeHandler={changeHandler} value='hellooou' checked={true} />)

    wrapper.first().simulate('change')

    expect(changeHandler).toHaveBeenCalledWith('hellooou')
  })

  it('calls the input handler with an undefined value if not checked', () => {
    const changeHandler = jest.fn()

    const wrapper = mount(<TRadio changeHandler={changeHandler} value='hellooou' checked={false} />)

    wrapper.first().simulate('change')

    expect(changeHandler).toHaveBeenCalledWith(undefined)
  })

  it('accept and handle a react state with the checked value', () => {
    const setState = jest.fn()

    const wrapper = mount(<TRadio state={['hellooou', setState]} checked={true} value='hellooou' />)

    wrapper.first().simulate('change')

    expect(setState).toHaveBeenCalledWith('hellooou')
  })

  it('set as not checked if checked false', () => {
    const wrapper = mount(<TRadio checked={false} onChange={() => {}} />)

    expect(wrapper.find('input').prop('checked')).toBe(false)
  })

  it('set as checked if checked true', () => {
    const wrapper = mount(<TRadio checked={true} onChange={() => {}} />)

    expect(wrapper.find('input').prop('checked')).toBe(true)
  })

  it('set as checked if the value is the same as the state and no checked attribute', () => {
    const state: [string, () => void] = ['selected', () => {}]

    const wrapper = mount(<TRadio value='selected' state={state} />)

    expect(wrapper.find('input').prop('checked')).toBe(true)
  })

  it('set as the checked attribute if the value is different to the state', () => {
    const state: [string, () => void] = ['selected', () => {}]

    const wrapper = mount(<TRadio value='other' state={state} checked={true} />)

    expect(wrapper.find('input').prop('checked')).toBe(true)
  })

  it('set as the checked attribute if the value is different to the state 2', () => {
    const state: [string, () => void] = ['selected', () => {}]

    const wrapper = mount(<TRadio value='other' state={state} checked={false} />)

    expect(wrapper.find('input').prop('checked')).toBe(false)
  })

  it('set as false if the state is not the checked value', () => {
    const state: [string, () => void] = ['nopup', () => {}]

    const wrapper = mount(<TRadio value='selected' state={state} />)

    expect(wrapper.find('input').prop('checked')).toBe(false)
  })

  it('set as checked if the value is equal to the state even if has the checked attribute as false', () => {
    const state: [string, () => void] = ['selected', () => {}]

    const wrapper = mount(<TRadio value='selected' state={state} checked={false} />)

    expect(wrapper.find('input').prop('checked')).toBe(true)
  })

  it('calls the on change event even if have a change handler', () => {
    const onChange = jest.fn()

    const wrapper = mount(
      <TRadio changeHandler={() => {}} value='hellooou' checked={true} onChange={onChange} />
    )

    wrapper.first().simulate('change')

    expect(onChange).toHaveBeenCalled()
  })

  it('calls the on change event even if have a state', () => {
    const onChange = jest.fn()

    const state: [string, () => void] = ['unselected', () => {}]

    const wrapper = mount(<TRadio state={state} onChange={onChange} />)

    wrapper.first().simulate('change')

    expect(onChange).toHaveBeenCalled()
  })
})
