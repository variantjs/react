import { WithVariantProps } from '@variantjs/core'
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import { withVariants } from '../hoc/WithVariants'
import { TButton as defaultConfiguration } from '../theme/TButton'

export type TButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const TButton: React.ComponentType<
  WithVariantProps<TButtonProps>
> = withVariants<TButtonProps>(
  (props: TButtonProps) => <button {...props} />,
  'TButton',
  defaultConfiguration
)
