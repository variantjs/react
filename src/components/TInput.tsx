import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TInput'
import { WithChangeHandler, WithState } from '../types'

export type TInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  & WithChangeHandler
  & WithState

const TInput = (props: TInputProps) => {
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

  return <input onChange={onChange} {...inputProps} />
}

export default withVariants<TInputProps>(TInput, 'TInput', defaultConfiguration)
