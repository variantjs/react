import { ChangeEvent, DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TTextarea'
import {
  handleStateAndChangeHandler,
  WithStateAndChangeHandler,
} from '../utils/handleStateAndChangeHandler'

export type TTextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  WithStateAndChangeHandler

const TTextarea = (props: TTextareaProps) => {
  const inputProps = handleStateAndChangeHandler<TTextareaProps, ChangeEvent<HTMLTextAreaElement>>(
    props,
    (e: ChangeEvent<HTMLTextAreaElement>) => e.currentTarget.value
  )

  return <textarea {...inputProps} />
}

export default withVariants<TTextareaProps>(TTextarea, 'TTextarea', defaultConfiguration)
