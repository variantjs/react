import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TInput'
import { handleStateAndChangeHandler, WithStateAndChangeHandler } from '../utils/handleStateAndChangeHandler'

export type TInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  & WithStateAndChangeHandler

const TInput = (props: TInputProps) => {
  const inputProps = handleStateAndChangeHandler<TInputProps, ChangeEvent<HTMLInputElement>>(
    props,
    (e: ChangeEvent<HTMLInputElement>) => e.currentTarget.value      
  )

  return <input {...inputProps} />
}

export default withVariants<TInputProps>(TInput, 'TInput', defaultConfiguration)
