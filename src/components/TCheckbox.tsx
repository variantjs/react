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
  const { changeHandler, state, type, uncheckedValue = '', ...inputProps } = props
  
  if (state !== undefined) {
    const [, setState] = state;
    inputProps.onChange = (e) => {
      const { value, checked } = e.currentTarget;
      setState(checked ? value : uncheckedValue)
    };
  } else if (changeHandler !== undefined) {
    inputProps.onChange = (e) => {
      const { value, checked } = e.currentTarget;
      changeHandler(checked ? value : uncheckedValue)
    };
  }
  
  return <input type="checkbox" {...inputProps} />
}

export default withVariants<TCheckboxProps>(TCheckbox, 'TCheckbox', defaultConfiguration)
