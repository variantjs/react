import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TCheckbox'
import { handleStateAndChangeHandler, WithStateAndChangeHandler } from '../utils/handleStateAndChangeHandler'

type InputWithouthType = Pick<InputHTMLAttributes<HTMLInputElement>, Exclude<keyof InputHTMLAttributes<HTMLInputElement>, "type">>

export type TCheckboxProps = DetailedHTMLProps<InputWithouthType, HTMLInputElement>
  & WithStateAndChangeHandler
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
  const { checked, uncheckedValue, ...inputProps} = handleStateAndChangeHandler<TCheckboxProps, ChangeEvent<HTMLInputElement>>(
    props,
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.currentTarget;
      return checked ? value : props.uncheckedValue;
    },
    false
  )

  const isChecked = shouldBeChecked(props.state, checked, props.value, uncheckedValue);

  return <input checked={isChecked} type="checkbox" {...inputProps} />
}

export default withVariants<TCheckboxProps>(TCheckbox, 'TCheckbox', defaultConfiguration)
