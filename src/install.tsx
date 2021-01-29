import React from 'react'
import { Configuration, VariantJSConfiguration } from './context/Configuration'

export { default as TInput } from './components/TInput'
export { default as TButton } from './components/TButton'
export { default as TSelect } from './components/TSelect'
export { default as TTextarea } from './components/TTextarea'

export const VariantJs = (props: { children: React.ReactNode, configuration?: VariantJSConfiguration }) => {
  return (
    <Configuration.Provider {...props} value={props.configuration || {}}>
      {props.children}
    </Configuration.Provider>
  );
}

