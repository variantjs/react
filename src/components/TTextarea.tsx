import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TTextarea'
import { WithChangeHandler, WithState } from '../types'

export type TTextareaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
  & WithChangeHandler
  & WithState

const TTextarea = (props: TTextareaProps) => {
  const { changeHandler, state, ...inputProps } = props
  
  if (state !== undefined) {
    const [currentState, setState] = state;
    inputProps.value = currentState;
    inputProps.onChange = (e) => setState(e.currentTarget.value);
  } else if (changeHandler !== undefined) {
    inputProps.onChange = (e) => changeHandler(e.currentTarget.value);
  }
  
  return <textarea {...inputProps} />
}

export default withVariants<TTextareaProps>(TTextarea, 'TTextarea', defaultConfiguration)
