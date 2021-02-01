import React from 'react'
import { Configuration, VariantJSConfiguration } from './context/Configuration'

export * from './components'

export const VariantJs = (props: {
  children: React.ReactNode
  configuration?: VariantJSConfiguration
}): JSX.Element => {
  return (
    <Configuration.Provider {...props} value={props.configuration || {}}>
      {props.children}
    </Configuration.Provider>
  )
}
