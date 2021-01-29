import defaultConfiguration from '../theme/TWrappedCheckbox'
import TCheckbox, { TCheckboxProps } from './TCheckbox'
import withVariantsWithinClassesList from '../hoc/WithVariantsWithinClassesList'
import { WithClassesList } from '../types'
import { useRef } from 'react';

export type TWrappedCheckboxProps = TCheckboxProps & WithClassesList & {
  label?: string
  labelTag?: keyof JSX.IntrinsicElements
  wrapperTag?: keyof JSX.IntrinsicElements
  inputWrapperTag?: keyof JSX.IntrinsicElements
};

export const classesListKeys = [
  'wrapper',
  'wrapperChecked',
  'inputWrapper',
  'inputWrapperChecked',
  'input',
  'label',
  'labelChecked',
]

const TWrappedCheckbox = (props: TWrappedCheckboxProps) => {
  const {
    classesList,
    className,
    children,
    label,
    labelTag: LabelTag = 'span',
    wrapperTag: WrapperTag = 'label',
    inputWrapperTag: InputWrapperTag = 'span',
    tabIndex,
    ...inputProps
  } = props

  let labelRef = useRef(null)

  return (
    <WrapperTag tabIndex={tabIndex} className={[className, classesList?.wrapper].join(' ').trim() || undefined} htmlFor={inputProps.id}>
      <InputWrapperTag className={classesList?.inputWrapper}>
        <TCheckbox
          className={classesList?.input}
          classes={undefined}
          fixedClasses={undefined}
          tabIndex={tabIndex !== undefined ? -1 : undefined}
          {...inputProps as any }
        />
      </InputWrapperTag>
      <LabelTag className={classesList?.label}>
        { label !== undefined ? label : children }
      </LabelTag>
      <span ref={labelRef}></span>
    </WrapperTag>
  ) 
}

export default withVariantsWithinClassesList<TWrappedCheckboxProps>(TWrappedCheckbox, 'TWrappedCheckbox', classesListKeys, defaultConfiguration)
