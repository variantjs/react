import React from 'react'
import { WithVariantProps } from '@variantjs/core'
import { TInputProps } from '../components/TInput';
import { TButtonProps } from '../components/TButton';
import { TSelectProps } from '../components/TSelect';

export type VariantJSConfiguration = {
  TInput?: WithVariantProps<TInputProps>
  TButton?: WithVariantProps<TButtonProps>
  TSelect?: WithVariantProps<TSelectProps>
}

export const Configuration = React.createContext<VariantJSConfiguration>({});