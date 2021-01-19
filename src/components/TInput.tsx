import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TInput'

export type TInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const TInput = (props: TInputProps) => <input {...props} />

export default withVariants<TInputProps>(TInput, 'TInput', defaultConfiguration)
