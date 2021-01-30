import defaultConfiguration from '../theme/TWrappedCheckbox'
import TCheckbox, { TCheckboxProps } from './TCheckbox'
import withVariantsWithinClassesList from '../hoc/WithVariantsWithinClassesList'
import { WithClassesList } from '../types'

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

  return (
    <WrapperTag data-test-id="wrapper" tabIndex={tabIndex} className={[className, classesList?.wrapper].join(' ').trim() || undefined} htmlFor={inputProps.id}>
      <InputWrapperTag data-test-id="inputWrapper" className={classesList?.inputWrapper}>
        <TCheckbox
          className={classesList?.input}
          classes={undefined}
          fixedClasses={undefined}
          tabIndex={tabIndex !== undefined ? -1 : undefined}
          {...inputProps as any }
        />
      </InputWrapperTag>
      <LabelTag data-test-id="label" className={classesList?.label}>
        { label !== undefined ? label : children }
      </LabelTag>
    </WrapperTag>
  ) 
}

export default withVariantsWithinClassesList<TWrappedCheckboxProps>(TWrappedCheckbox, 'TWrappedCheckbox', classesListKeys, defaultConfiguration)
