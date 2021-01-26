import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'
import { InputOptions, normalizeOptions } from '@variantjs/core'

import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TSelect'

export type TSelectValue = string | undefined | string[];

export type TSelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  options?: InputOptions,
  inputHandler?: (value: any) => void,
}

const TSelect = (props: TSelectProps) => {
  const { options, inputHandler, ...inputProps } = props

  let normalizedOptions;
  if (options !== undefined) {
    normalizedOptions = normalizeOptions(options)
  }

  if (inputHandler !== undefined) {
    inputProps.onInput = (e) => {
      const select = e.currentTarget;
      if (select.multiple) {
        const values = Array.from(select.selectedOptions).map(o => o.value);
        inputHandler(values)
      } else {
        inputHandler(select.value)
      }
    }
  }

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
