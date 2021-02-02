import React from 'react'
import {
  ObjectWithClassesList,
  parseVariantWithClassesList,
  WithVariantPropsAndClassesList,
} from '@variantjs/core'
import { Configuration } from '../context/Configuration'

type ComponentName = 'TWrappedCheckbox' | 'TWrappedRadio'

export const withVariantsWithinClassesList = <P extends ObjectWithClassesList>(
  WrappedComponent: React.ComponentType<P>,
  componentName: ComponentName,
  classesListKeys: Array<string>,
  defaultConfiguration?: WithVariantPropsAndClassesList<P>
): React.ComponentType<WithVariantPropsAndClassesList<P>> => {
  return class WithVariantsWithinClassesList extends React.Component<
    WithVariantPropsAndClassesList<P>
  > {
    static contextType = Configuration

    context!: React.ContextType<typeof Configuration>

    render() {
      const globalConfiguration = this.context[componentName] as WithVariantPropsAndClassesList<P>

      const props = parseVariantWithClassesList(
        this.props,
        classesListKeys,
        globalConfiguration,
        defaultConfiguration
      )

      return <WrappedComponent {...props} />
    }
  }
}
