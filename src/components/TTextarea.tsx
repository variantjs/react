import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TTextarea'

export type TTextareaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  inputHandler?: React.Dispatch<React.SetStateAction<string | undefined>>
}

const TTextarea = (props: TTextareaProps) => {
  const { inputHandler, ...inputProps } = props
  
  if (inputHandler !== undefined) {
    inputProps.onInput = (e) => {
inputHandler(e.currentTarget.value)
    }
  }
  
  return <textarea {...inputProps} />
}

export default withVariants<TTextareaProps>(TTextarea, 'TTextarea', defaultConfiguration)
