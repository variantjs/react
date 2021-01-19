import React from 'react';
import { ObjectWithClassName, parseVariant, WithVariantProps } from '@variantjs/core'
import { Configuration } from '../context/Configuration'

type ComponentName = 'TInput' | 'TSelect';

const withVariants = <P extends ObjectWithClassName>(WrappedComponent: React.ComponentType<P>, componentName: ComponentName) => {
  return class extends React.Component<WithVariantProps<P>> {
    static contextType = Configuration;

    context!: React.ContextType<typeof Configuration>;

    render() {
      const globalConfiguration = this.context[componentName] as WithVariantProps<P>;

      const props = parseVariant(this.props, globalConfiguration)
      
      return <WrappedComponent { ...props } />
    }
  }
}

export default withVariants;
