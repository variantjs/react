import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import withVariants from '../hoc/WithVariants'

export type TInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const TInput = (props: TInputProps) => <input {...props} />

export default withVariants<TInputProps>(TInput, 'TInput')
