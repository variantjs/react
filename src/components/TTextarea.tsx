import { WithVariantProps } from '@variantjs/core'
import { ChangeEvent, DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import { withVariants } from '../hoc/WithVariants'
import { TTextarea as defaultConfiguration } from '../theme/TTextarea'
import {
  handleStateAndChangeHandler,
  WithStateAndChangeHandler,
} from '../utils/handleStateAndChangeHandler'

export type TTextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  WithStateAndChangeHandler

export const TTextarea: React.ComponentType<
  WithVariantProps<TTextareaProps>
> = withVariants<TTextareaProps>(
  (props: TTextareaProps) => {
    const inputProps = handleStateAndChangeHandler<
      TTextareaProps,
      ChangeEvent<HTMLTextAreaElement>
    >(props, (e: ChangeEvent<HTMLTextAreaElement>) => e.currentTarget.value)

    return <textarea {...inputProps} />
  },
  'TTextarea',
  defaultConfiguration
)
