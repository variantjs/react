import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TCheckbox'
import { WithChangeHandler, WithState } from '../types'

export type TCheckboxProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  & WithChangeHandler
  & WithState
  & {
    uncheckedValue?: string | number | readonly string[] | undefined,
  }

export const shouldBeChecked = (
  state?: [any, (value: any) => void],
  inputChecked?: boolean,
  value?: string | number | readonly string[] | undefined,
  uncheckedValue?: string | number | readonly string[] | undefined,
): boolean | undefined => {
  const currentState = state ? state[0] : undefined;
  
  if (currentState !== undefined) {
    if (uncheckedValue !== undefined && currentState === uncheckedValue) {
      return false
    } else if (currentState === value) {
      return true
    }
  }

  return inputChecked
}

const TCheckbox = (props: TCheckboxProps) => {
  const { changeHandler, state, type, uncheckedValue = '', checked, value, onChange: originalOnChange, ...inputProps } = props

  const isChecked = shouldBeChecked(state, checked, value, uncheckedValue);

  let onChange = originalOnChange;

  if (state !== undefined) {
    const [, setState] = state;
    onChange = (e) => {
      const { value, checked } = e.currentTarget;
      setState(checked ? value : uncheckedValue)

      if (typeof originalOnChange === 'function') {
        originalOnChange(e)
      }
    };
  } else if (changeHandler !== undefined) {
    onChange = (e) => {
      const { value, checked } = e.currentTarget;
      changeHandler(checked ? value : uncheckedValue)

      if (typeof originalOnChange === 'function') {
        originalOnChange(e)
      }
    };
  }
  
  return <input onChange={onChange} checked={isChecked} value={value} type="checkbox" {...inputProps} />
}

export default withVariants<TCheckboxProps>(TCheckbox, 'TCheckbox', defaultConfiguration)
