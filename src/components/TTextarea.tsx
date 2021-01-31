import { ChangeEvent, DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TTextarea'
import { WithChangeHandler, WithState } from '../types'
import { handleStateAndChangeHandler } from '../utils/handleStateAndChangeHandler'

export type TTextareaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
  & WithChangeHandler
  & WithState

const TTextarea = (props: TTextareaProps) => {
  const inputProps = handleStateAndChangeHandler<TTextareaProps, ChangeEvent<HTMLTextAreaElement>>(
    props,
    (e: ChangeEvent<HTMLTextAreaElement>) => e.currentTarget.value      
  )

  return <textarea {...inputProps} />
  
}

export default withVariants<TTextareaProps>(TTextarea, 'TTextarea', defaultConfiguration)
