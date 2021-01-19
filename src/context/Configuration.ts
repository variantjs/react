import React from 'react'
import { TInputProps } from '../components/TInput';
import { WithVariantProps } from '@variantjs/core'

export type VariantJSConfiguration = {
  TInput?: WithVariantProps<TInputProps>
  TSelect?: WithVariantProps<{
    test: 'something'
  }>
}

export const Configuration = React.createContext<VariantJSConfiguration>({});