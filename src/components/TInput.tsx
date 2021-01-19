import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
// import { CSSClass } from '@variantjs/core'
// import Variant from '../hoc/WithVariants'
import withVariants from '../hoc/WithVariants'

// type SelectedVariant = string

// type Variants = {
//   [key: string]: TInputProps | undefined
// }

// export interface TInputProps
//   extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
//   classes?: CSSClass
//   fixedClasses?: CSSClass
//   variants?: Variants
//   variant?: SelectedVariant
// }

export type TInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const TInput = (props: TInputProps) => <input {...props} />

export default withVariants<TInputProps>(TInput)
