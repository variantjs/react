import { WithVariantProps } from '@variantjs/core'
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { withVariants } from '../hoc/WithVariants'
import { TInput as defaultConfiguration } from '../theme/TInput'
import {
  handleStateAndChangeHandler,
  WithStateAndChangeHandler,
} from '../utils/handleStateAndChangeHandler'

export type TInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  WithStateAndChangeHandler

export const TInput: React.ComponentType<WithVariantProps<TInputProps>> = withVariants<TInputProps>(
  (props: TInputProps) => {
    const inputProps = handleStateAndChangeHandler<TInputProps, ChangeEvent<HTMLInputElement>>(
      props,
      (e: ChangeEvent<HTMLInputElement>) => e.currentTarget.value
    )

    return <input {...inputProps} />
  },
  'TInput',
  defaultConfiguration
)
