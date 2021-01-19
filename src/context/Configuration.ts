import React from 'react'
import { TInputProps } from '../components/TInput';
import { WithVariantProps } from '../hoc/WithVariants';

export type VariantJSConfiguration = {
  TInput?: TInputProps & WithVariantProps<TInputProps>
}

export const Configuration = React.createContext<VariantJSConfiguration>({});