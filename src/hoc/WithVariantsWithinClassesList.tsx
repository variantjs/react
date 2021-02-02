import React from 'react'
import {
  CSSRawClassesList,
  ObjectWithClassesList,
  parseVariantWithClassesList,
  WithVariantPropsAndClassesList,
} from '@variantjs/core'
import { Configuration } from '../context/Configuration'

type ComponentName = 'TWrappedCheckbox' | 'TWrappedRadio'

export const withVariantsWithinClassesList = <
  P extends ObjectWithClassesList,
  C extends CSSRawClassesList
>(
  WrappedComponent: React.ComponentType<P>,
  componentName: ComponentName,
  classesListKeys: Array<string>,
  defaultConfiguration?: WithVariantPropsAndClassesList<P, C>
): React.ComponentType<WithVariantPropsAndClassesList<P, C>> => {
  return class WithVariantsWithinClassesList extends React.Component<
    WithVariantPropsAndClassesList<P, C>
  > {
    static contextType = Configuration

    context!: React.ContextType<typeof Configuration>

    render() {
      const globalConfiguration = this.context[componentName] as WithVariantPropsAndClassesList<
        P,
        C
      >

      const props = parseVariantWithClassesList<P, C>(
        this.props,
        classesListKeys,
        globalConfiguration,
        defaultConfiguration
      )

      return <WrappedComponent {...props} />
    }
  }
}
