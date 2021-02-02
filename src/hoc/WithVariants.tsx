import React from 'react'
import { ObjectWithClassName, parseVariant, WithVariantProps } from '@variantjs/core'
import { Configuration } from '../context/Configuration'

type ComponentName = 'TInput' | 'TButton' | 'TSelect' | 'TTextarea' | 'TCheckbox' | 'TRadio'

export const withVariants = <P extends ObjectWithClassName>(
  WrappedComponent: React.ComponentType<P>,
  componentName: ComponentName,
  defaultConfiguration?: WithVariantProps<P>
): React.ComponentType<WithVariantProps<P>> => {
  return class WithVariants extends React.Component<WithVariantProps<P>> {
    static contextType = Configuration

    context!: React.ContextType<typeof Configuration>

    render() {
      const globalConfiguration = this.context[componentName] as WithVariantProps<P>

      const props = parseVariant(this.props, globalConfiguration, defaultConfiguration)

      return <WrappedComponent {...props} />
    }
  }
}
