import React from 'react'
import { WithVariantProps } from '@variantjs/core'
import { TInputProps } from '../components/TInput';
import { TButtonProps } from '../components/TButton';
import { TSelectProps } from '../components/TSelect';
import { TTextareaProps } from '../components/TTextarea';

export type VariantJSConfiguration = {
  TInput?: WithVariantProps<TInputProps>
  TButton?: WithVariantProps<TButtonProps>
  TSelect?: WithVariantProps<TSelectProps>
  TTextarea?: WithVariantProps<TTextareaProps>
}

export const Configuration = React.createContext<VariantJSConfiguration>({});