import React from 'react'
import { Configuration, VariantJSConfiguration } from './context/Configuration'

const VariantJs = (props: { children: React.ReactNode, configuration?: VariantJSConfiguration }) => {
  return (
    <Configuration.Provider {...props} value={props.configuration || {}}>
      {props.children}
    </Configuration.Provider>
  );
}

export default VariantJs;
