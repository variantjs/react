import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TTextarea'
import { WithChangeHandler, WithState } from '../types'

export type TTextareaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
  & WithChangeHandler
  & WithState

const TTextarea = (props: TTextareaProps) => {
  const { changeHandler, state, onChange: originalOnChange, ...inputProps } = props
  
  let onChange = originalOnChange;
  
  if (state !== undefined) {
    const [currentState, setState] = state;
    inputProps.value = currentState;
    onChange = (e) => {
      setState(e.currentTarget.value)

      if (typeof originalOnChange === 'function') {
        originalOnChange(e)
      }
    };
  } else if (changeHandler !== undefined) {
    onChange = (e) => {
      changeHandler(e.currentTarget.value);

      if (typeof originalOnChange === 'function') {
        originalOnChange(e)
      }
    }
  }
  
  return <textarea onChange={onChange} {...inputProps} />
}

export default withVariants<TTextareaProps>(TTextarea, 'TTextarea', defaultConfiguration)
