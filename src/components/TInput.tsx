import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TInput'
import { WithChangeHandler, WithState } from '../types'
import { handleStateAndChangeHandler } from '../utils/handleStateAndChangeHandler'

export type TInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  & WithChangeHandler
  & WithState

const TInput = (props: TInputProps) => {
  const inputProps = handleStateAndChangeHandler<TInputProps, ChangeEvent<HTMLInputElement>>(
    props,
    (e: ChangeEvent<HTMLInputElement>) => e.currentTarget.value      
  )

  return <input {...inputProps} />
}

export default withVariants<TInputProps>(TInput, 'TInput', defaultConfiguration)
