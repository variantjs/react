import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TInput'
import { WithChangeHandler, WithState } from '../types'

export type TInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  & WithChangeHandler
  & WithState

const TInput = (props: TInputProps) => {
  const { changeHandler, state, ...inputProps } = props

  if (state !== undefined) {
    const [currentState, setState] = state;
    inputProps.value = currentState;
    inputProps.onChange = (e) => setState(e.currentTarget.value);
  } else if (changeHandler !== undefined) {
    inputProps.onChange = (e) => changeHandler(e.currentTarget.value);
  }

  return <input {...inputProps} />
}

export default withVariants<TInputProps>(TInput, 'TInput', defaultConfiguration)
