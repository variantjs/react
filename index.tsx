import React from 'react'
import { Configuration, VariantJSConfiguration } from './src/context/Configuration'

export * from './src/components'

export const VariantJs = (props: {
  children: React.ReactNode
  configuration?: VariantJSConfiguration
}): JSX.Element => {
  console.log(props)
  return (
    <Configuration.Provider {...props} value={props.configuration || {}}>
      {props.children}
    </Configuration.Provider>
  )
}
