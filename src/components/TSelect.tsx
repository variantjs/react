import { DetailedHTMLProps, SelectHTMLAttributes, ChangeEvent } from 'react'
import { InputOptions, normalizeOptions } from '@variantjs/core'
import withVariants from '../hoc/WithVariants'
import defaultConfiguration from '../theme/TSelect'
import { WithChangeHandler, WithState } from '../types';

export type TSelectValue = string | undefined | string[];

export type TSelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
  & WithChangeHandler
  & WithState
  & {
    options?: InputOptions
  }

const TSelect = (props: TSelectProps) => {
  const { options, changeHandler, state, onChange: originalOnChange, ...inputProps } = props

  let normalizedOptions;
  if (options !== undefined) {
    normalizedOptions = normalizeOptions(options)
  }

  let onChange = originalOnChange;
  
  if (state !== undefined) {
    const [currentState, setState] = state;
    inputProps.value = currentState;
    onChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const select = e.currentTarget;
      if (select.multiple) {
        const values = Array.from(select.selectedOptions).map(o => o.value);
        setState(values)
      } else {
        setState(select.value)
      }

      if (typeof originalOnChange === 'function') {
        originalOnChange(e)
      }
    };
  } else if (changeHandler !== undefined) {
    onChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const select = e.currentTarget;
      if (select.multiple) {
        const values = Array.from(select.selectedOptions).map(o => o.value);
        changeHandler(values)
      } else {
        changeHandler(select.value)
      }

      if (typeof originalOnChange === 'function') {
        originalOnChange(e)
      }
    }
  }

  return  (
    <select onChange={onChange} {...inputProps}>
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
