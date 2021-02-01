import React from 'react'
import { WithVariantProps } from '@variantjs/core'
import { TInputProps } from '../components/TInput'
import { TCheckboxProps } from '../components/TCheckbox'
import { TRadioProps } from '../components/TRadio'
import { TButtonProps } from '../components/TButton'
import { TSelectProps } from '../components/TSelect'
import { TTextareaProps } from '../components/TTextarea'
import { TWrappedCheckboxProps } from '../components/TWrappedCheckbox'
import { TWrappedRadioProps } from '../components/TWrappedRadio'

export type VariantJSConfiguration = {
  TInput?: WithVariantProps<TInputProps>
  TButton?: WithVariantProps<TButtonProps>
  TSelect?: WithVariantProps<TSelectProps>
  TTextarea?: WithVariantProps<TTextareaProps>
  TCheckbox?: WithVariantProps<TCheckboxProps>
  TRadio?: WithVariantProps<TRadioProps>
  TWrappedCheckbox?: WithVariantProps<TWrappedCheckboxProps>
  TWrappedRadio?: WithVariantProps<TWrappedRadioProps>
}

export const Configuration = React.createContext<VariantJSConfiguration>({})
