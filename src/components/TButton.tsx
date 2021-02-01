import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import { withVariants } from '../hoc/WithVariants'
import { TButton as defaultConfiguration } from '../theme/TButton'

export type TButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const TButton = withVariants<TButtonProps>(
  (props: TButtonProps) => <button {...props} />,
  'TButton',
  defaultConfiguration
)
