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

const TCheckbox = (props: TCheckboxProps) => {
  const { changeHandler, state, type, uncheckedValue = '', onChange: originalOnChange, ...inputProps } = props

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
  
  return <input onChange={onChange} type="checkbox" {...inputProps} />
}

export default withVariants<TCheckboxProps>(TCheckbox, 'TCheckbox', defaultConfiguration)
