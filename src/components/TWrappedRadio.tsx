import { ChangeEvent, useState } from 'react'
import { TWrappedRadio as defaultConfiguration } from '../theme/TWrappedRadio'
import { TRadio, TRadioProps, radioShouldBeChecked } from './TRadio'
import { withVariantsWithinClassesList } from '../hoc/WithVariantsWithinClassesList'
import { WithClassesList } from '../types'
import { CSSClass, WithVariantPropsAndClassesList } from '@variantjs/core'

export type TWrappedRadioProps = TRadioProps &
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

type validClassesListKeys =
  | 'wrapper'
  | 'wrapperChecked'
  | 'inputWrapper'
  | 'inputWrapperChecked'
  | 'input'
  | 'label'
  | 'labelChecked'

type classesListKeysType = {
  [key in validClassesListKeys]?: CSSClass
}

export const TWrappedRadio: React.ComponentType<
  WithVariantPropsAndClassesList<TWrappedRadioProps, classesListKeysType>
> = withVariantsWithinClassesList<TWrappedRadioProps, classesListKeysType>(
  (props: TWrappedRadioProps) => {
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
      checked,
      ...inputProps
    } = props

    const isChecked = radioShouldBeChecked(state, checked, value)

    const [checkedState, setChecked] = useState<boolean | undefined>(isChecked)

    if (isChecked !== checkedState) {
      setChecked(isChecked)
    }

    const radio = (
      <TRadio
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
          {radio}
        </InputWrapperTag>
        <LabelTag data-test-id='label' className={labelClass}>
          {label !== undefined ? label : children}
        </LabelTag>
      </WrapperTag>
    )
  },
  'TWrappedRadio',
  classesListKeys,
  defaultConfiguration
)
