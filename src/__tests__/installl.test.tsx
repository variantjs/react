import { VariantJs } from '../install'
import { VariantJSConfiguration } from '../context/Configuration'
import TInput from '../components/TInput'
import TInputTheme from '../theme/TInput'
import { mount } from 'enzyme'

describe('VariantJs installer', () => {
  it('applies the variant js global configuration', () => {
    const configuration: VariantJSConfiguration = {
      TInput: {
        classes: 'text-red-600',
        fixedClasses: 'p-3',
      },
    }

    const variantJsNode = mount(
      <VariantJs configuration={configuration}>
        <TInput />
      </VariantJs>
    )

    expect(variantJsNode.html()).toBe('<input class="text-red-600 p-3">')
  })

  it('handles an empty configuration', () => {
    const variantJsNode = mount(
      <VariantJs>
        <TInput />
      </VariantJs>
    )

    expect(variantJsNode.html()).toBe(`<input class="${TInputTheme.classes}">`)
  })
})
