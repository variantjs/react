import { ChangeEvent, useState } from 'react'
import { TWrappedCheckbox as defaultConfiguration } from '../theme/TWrappedCheckbox'
import { checkboxShouldBeChecked, TCheckbox, TCheckboxProps } from './TCheckbox'
import { withVariantsWithinClassesList } from '../hoc/WithVariantsWithinClassesList'
import { WithClassesList } from '../types'

export type TWrappedCheckboxProps = TCheckboxProps &
  WithClassesList & {
    label?: string
    labelTag?: keyof JSX.IntrinsicElements
    wrapperTag?: keyof JSX.IntrinsicElements
    inputWrapperTag?: keyof JSX.IntrinsicElements
  }

const classesListKeys = [
  'wrapper',
  'wrapperChecked',
  'inputWrapper',
  'inputWrapperChecked',
  'input',
  'label',
  'labelChecked',
]

export const TWrappedCheckbox = withVariantsWithinClassesList<TWrappedCheckboxProps>(
  (props: TWrappedCheckboxProps) => {
    const {
      classesList,
      className,
      children,
      label,
      labelTag: LabelTag = 'span',
      wrapperTag: WrapperTag = 'label',
      inputWrapperTag: InputWrapperTag = 'span',
      tabIndex,
      state,
      value,
      uncheckedValue,
      checked,
      ...inputProps
    } = props

    const isChecked = checkboxShouldBeChecked(state, checked, value, uncheckedValue)

    const [checkedState, setChecked] = useState<boolean | undefined>(isChecked)

    if (isChecked !== checkedState) {
      setChecked(isChecked)
    }

    const checkbox = (
      <TCheckbox
        className={classesList?.input}
        classes={undefined}
        fixedClasses={undefined}
        tabIndex={tabIndex !== undefined ? -1 : undefined}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { checked } = e.currentTarget
          setChecked(checked)
        }}
        state={state}
        value={value}
        checked={isChecked}
        uncheckedValue={uncheckedValue}
        {...(inputProps as any)}
      />
    )

    const wrapperClass =
      checkedState && classesList?.wrapperChecked !== undefined
        ? classesList.wrapperChecked
        : classesList?.wrapper
    const labelClass =
      checkedState && classesList?.labelChecked !== undefined
        ? classesList.labelChecked
        : classesList?.label
    const inputWrapperClass =
      checkedState && classesList?.inputWrapperChecked !== undefined
        ? classesList.inputWrapperChecked
        : classesList?.inputWrapper

    return (
      <WrapperTag
        data-checked={isChecked}
        data-test-id='wrapper'
        tabIndex={tabIndex}
        className={[className, wrapperClass].join(' ').trim() || undefined}
        htmlFor={inputProps.id}
      >
        <InputWrapperTag data-test-id='inputWrapper' className={inputWrapperClass}>
          {checkbox}
        </InputWrapperTag>
        <LabelTag data-test-id='label' className={labelClass}>
          {label !== undefined ? label : children}
        </LabelTag>
      </WrapperTag>
    )
  },
  'TWrappedCheckbox',
  classesListKeys,
  defaultConfiguration
)
