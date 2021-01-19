import React from 'react'
import { WithVariantProps } from '@variantjs/core'
import { TInputProps } from '../components/TInput';
import { TButtonProps } from '../components/TButton';

export type VariantJSConfiguration = {
  TInput?: WithVariantProps<TInputProps>
  TButton?: WithVariantProps<TButtonProps>
}

export const Configuration = React.createContext<VariantJSConfiguration>({});