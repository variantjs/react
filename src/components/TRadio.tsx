import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TRadio'
import {
  handleStateAndChangeHandler,
  WithStateAndChangeHandler,
} from '../utils/handleStateAndChangeHandler'

type InputWithouthType = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  Exclude<keyof InputHTMLAttributes<HTMLInputElement>, 'type'>
>

export type TRadioProps = DetailedHTMLProps<InputWithouthType, HTMLInputElement> &
  WithStateAndChangeHandler

export const shouldBeChecked = (
  state?: [any, (value: any) => void],
  inputChecked?: boolean,
  value?: string | number | readonly string[] | undefined
): boolean | undefined => {
  const currentState = state ? state[0] : undefined

  if (currentState !== undefined) {
    return currentState === value
  }

  return inputChecked
}

const TRadio = (props: TRadioProps) => {
  const { checked, ...inputProps } = handleStateAndChangeHandler<
    TRadioProps,
    ChangeEvent<HTMLInputElement>
  >(
    props,
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.currentTarget
      return checked ? value : undefined
    },
    false
  )

  const isChecked = shouldBeChecked(props.state, checked, props.value)

  return <input checked={isChecked} type='radio' {...inputProps} />
}

export default withVariants<TRadioProps>(TRadio, 'TRadio', defaultConfiguration)
