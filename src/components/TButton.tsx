import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TButton'

export type TButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const TButton = (props: TButtonProps) => <button {...props} />

export default withVariants<TButtonProps>(TButton, 'TButton', defaultConfiguration)
