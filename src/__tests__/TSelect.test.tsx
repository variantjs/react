import React from 'react'
import { shallow, mount } from 'enzyme'
import { Configuration, VariantJSConfiguration } from '../context/Configuration'
import TSelect from '../components/TSelect'
import TSelectTheme from '../theme/TSelect'

describe('TSelect', () => {
  it('renders the select without errors', () => {
    const wrapper = shallow(<TSelect />)

    expect(wrapper).toBeTruthy()
  })

  it('has a default theme', () => {
    const wrapper = shallow(<TSelect />)

    const selectProps = wrapper.first().props()

    expect(selectProps.className).toBe(TSelectTheme.classes)
  })

  it('accepts select input html attributes', () => {
    const wrapper = shallow(
      <TSelect multiple size={10} disabled={true} placeholder='Hello world' classes={undefined} />
    )

    expect(wrapper.html()).toBe(
      '<select multiple="" size="10" disabled="" placeholder="Hello world"></select>'
    )
  })

  it('doesnt have any attributes by default', () => {
    const wrapper = shallow(<TSelect classes={undefined} />)

    expect(wrapper.html()).toBe('<select></select>')
  })

  it('select the props from the selected variant', () => {
    const variants = {
      error: {
        classes: 'text-red-500',
        multiple: true,
      },
    }

    const wrapper = shallow(<TSelect classes='text-black' variant='error' variants={variants} />)

    const selectProps = wrapper.first().props()

    expect(selectProps.className).toBe('text-red-500')
    expect(selectProps.multiple).toBe(true)
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

    const wrapper = shallow(<TSelect {...props} />)
    const selectProps = wrapper.first().props()

    expect(selectProps.fixedClasses).toBeUndefined()
    expect(selectProps.classes).toBeUndefined()
    expect(selectProps.variant).toBeUndefined()
    expect(selectProps.variatns).toBeUndefined()
  })

  it('uses the props from the selected configuration variant', () => {
    const configuration: VariantJSConfiguration = {
      TSelect: {
        classes: 'text-black',
        variants: {
          error: {
            multiple: true,
            classes: 'text-red-500',
          },
        },
      },
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TSelect variant='error' />
      </Configuration.Provider>
    )

    const selectProps = wrapper.find('select').props()

    expect(selectProps.className).toBe('text-red-500')
    expect(selectProps.multiple).toBe(true)
  })

  it('uses the props from the configuration', () => {
    const configuration: VariantJSConfiguration = {
      TSelect: {
        classes: 'text-black',
        multiple: true,
      },
    }

    const wrapper = mount(
      <Configuration.Provider value={configuration}>
        <TSelect />
      </Configuration.Provider>
    )

    const selectProps = wrapper.find('select').props()

    expect(selectProps.className).toBe('text-black')
    expect(selectProps.multiple).toBe(true)
  })

  it('the input handler sends an array if multiple', () => {
    const changeHandler = jest.fn()

    const wrapper = mount(
      <TSelect multiple changeHandler={changeHandler} options={['hellooou']} value={['hellooou']} />
    )

    wrapper.first().simulate('change')

    expect(changeHandler).toHaveBeenCalledWith(['hellooou'])
  })

  it('calls the input handler if set', () => {
    const changeHandler = jest.fn()
    const wrapper = mount(
      <TSelect changeHandler={changeHandler} options={['hellooou']} value='hellooou' />
    )

    wrapper.first().simulate('change')

    expect(changeHandler).toHaveBeenCalledWith('hellooou')
  })

  it('accept and handle a react state', () => {
    const setState = jest.fn()

    const state: [string, () => void] = ['hellooou', setState]

    const wrapper = mount(<TSelect state={state} options={['hellooou']} value='hellooou' />)

    wrapper.first().simulate('change')

    expect(setState).toHaveBeenCalledWith('hellooou')
  })

  it('the state handler store an array if multiple', () => {
    const setState = jest.fn()

    const state: [string[], () => void] = [['hellooou'], setState]

    const wrapper = mount(
      <TSelect state={state} options={['hellooou']} value={['hellooou']} multiple />
    )

    wrapper.first().simulate('change')

    expect(setState).toHaveBeenCalledWith(['hellooou'])
  })

  it('calls the on change event even if have a change handler', () => {
    const onChange = jest.fn()

    const wrapper = mount(
      <TSelect
        changeHandler={() => {}}
        onChange={onChange}
        options={['hellooou']}
        value='hellooou'
      />
    )

    wrapper.first().simulate('change')

    expect(onChange).toHaveBeenCalled()
  })

  it('calls the on change event even if have a state', () => {
    const onChange = jest.fn()

    const state: [string, () => void] = ['hellooou', () => {}]

    const wrapper = mount(
      <TSelect state={state} onChange={onChange} options={['hellooou']} value='hellooou' />
    )

    wrapper.first().simulate('change')

    expect(onChange).toHaveBeenCalled()
  })
})

describe('TSelect options', () => {
  it('render the options set on the option param', () => {
    const options = ['Option A', 'Option B']

    const wrapper = shallow(<TSelect classes={undefined} options={options} />)

    const html = wrapper.html()

    expect(html).toBe(
      '<select><option value="Option A">Option A</option><option value="Option B">Option B</option></select>'
    )
  })

  it('renders an option with no value if the value is null', () => {
    const options = [{ value: null, text: 'Option A' }]

    const wrapper = shallow(<TSelect classes={undefined} options={options} />)

    const html = wrapper.html()

    expect(html).toBe('<select><option>Option A</option></select>')
  })

  it('renders an option with no value if the value is undefined', () => {
    const options = [{ text: 'Option A' }]

    const wrapper = shallow(<TSelect classes={undefined} options={options} />)

    const html = wrapper.html()

    expect(html).toBe('<select><option>Option A</option></select>')
  })

  it('render the optgroups with the children options', () => {
    const options = [
      { value: 'A', text: 'Option A' },
      {
        text: 'Group A',
        children: ['A', 'B', 'C'],
      },
      {
        text: 'Group B',
        children: [1, 2],
      },
    ]

    const wrapper = shallow(<TSelect classes={undefined} options={options} />)

    const html = wrapper.html()

    expect(html).toBe(
      '<select><option value="A">Option A</option><optgroup label="Group A"><option value="A">A</option><option value="B">B</option><option value="C">C</option></optgroup><optgroup label="Group B"><option value="1">1</option><option value="2">2</option></optgroup></select>'
    )
  })

  it('render the optgroups options with no value if the children value is null', () => {
    const options = [
      {
        text: 'Group A',
        children: [{ value: null, text: 'A' }],
      },
    ]

    const wrapper = shallow(<TSelect classes={undefined} options={options} />)

    const html = wrapper.html()

    expect(html).toBe('<select><optgroup label="Group A"><option>A</option></optgroup></select>')
  })

  it('render the optgroups options with no value if the children value is undefined', () => {
    const options = [
      {
        text: 'Group A',
        children: [{ text: 'A' }],
      },
    ]

    const wrapper = shallow(<TSelect classes={undefined} options={options} />)

    const html = wrapper.html()

    expect(html).toBe('<select><optgroup label="Group A"><option>A</option></optgroup></select>')
  })

  it('render the optgroups with no label if no text', () => {
    const options = [
      {
        children: [{ text: 'A' }],
      },
    ]

    const wrapper = shallow(<TSelect classes={undefined} options={options} />)

    const html = wrapper.html()

    expect(html).toBe('<select><optgroup><option>A</option></optgroup></select>')
  })

  it('select the options in the value', () => {
    const options = ['A', 'B', 'C', 'D']
    const value = ['A', 'D']

    const wrapper = mount(
      <TSelect options={options} value={value} multiple changeHandler={() => {}} />
    )

    const select: unknown = wrapper.find('select').instance()

    expect(Array.from((select as HTMLSelectElement).selectedOptions).map((o) => o.value)).toEqual(
      value
    )
  })
})
