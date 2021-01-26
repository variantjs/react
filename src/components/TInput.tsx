import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TInput'

export type TInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  inputHandler?: React.Dispatch<React.SetStateAction<string | undefined>>
}

const TInput = (props: TInputProps) => {
  const { inputHandler, ...inputProps } = props
  
  if (inputHandler !== undefined) {
    inputProps.onInput = (e) => {
inputHandler(e.currentTarget.value)
    }
  }
  
  return <input {...inputProps} />
}

export default withVariants<TInputProps>(TInput, 'TInput', defaultConfiguration)
