import { DetailedHTMLProps, SelectHTMLAttributes, ChangeEvent } from 'react'
import { InputOptions, normalizeOptions } from '@variantjs/core'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TSelect'
import { handleStateAndChangeHandler, WithStateAndChangeHandler } from '../utils/handleStateAndChangeHandler';

export type TSelectValue = string | undefined | string[];

export type TSelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
  & WithStateAndChangeHandler
  & {
    options?: InputOptions
  }

const TSelect = (props: TSelectProps) => {
  const { options, ...inputProps } = handleStateAndChangeHandler<TSelectProps, ChangeEvent<HTMLSelectElement>>(
    props,
    (e: ChangeEvent<HTMLSelectElement>) => {
      const select = e.currentTarget
      if (select.multiple) {
        return Array.from(select.selectedOptions).map(o => o.value);
      } else {
        return select.value
      }
    }
  )
  
  const normalizedOptions = options !== undefined ? normalizeOptions(options) : undefined
  
  return  (
    <select {...inputProps}>
      {normalizedOptions?.map((option, index) => {
        if (option.children && option.children.length) {
          return <optgroup
            key={`${option.value}-${index}`}
            label={option.text !== undefined ? String(option.text) : undefined}
          >
            {option.children.map((childrenOption, index2) => {
              return <option
                key={`${childrenOption.value}-${index}-${index2}`}
                value={childrenOption.value === null ? undefined : childrenOption.value}
              >{childrenOption.text}</option>
            })}
          </optgroup>
        }

        return <option
          key={`${option.value}-${index}`}
          value={option.value === null ? undefined : option.value}
        >{option.text}</option>
      })} 
    </select>
  )
}

export default withVariants<TSelectProps>(TSelect, 'TSelect', defaultConfiguration)
