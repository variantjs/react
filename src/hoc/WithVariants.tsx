import React from 'react';
import { CSSClass, mergeClasses } from '@variantjs/core'

export type WithVariantProps<P> = {
  classes?: CSSClass,
  fixedClasses?: CSSClass,
  variants?: Variants<P>,
  variant?: string,
  className?: string,
} & P

interface Variants<P> {
  [key: string]: WithVariantProps<P> | undefined
}

type ObjectWithClassName = {
  className?: string
}

const getCustomPropsFromVariant = <P extends ObjectWithClassName>(variants?: Variants<P>, variant?: string): WithVariantProps<P> | undefined => {
  if (variant !== undefined) {
    // const variants = variants || (configuration && configuration.variants)
    
    if (variants) {
      return variants[variant]
    }

    return undefined
  }

  return undefined
}

const parseVariant = <P extends ObjectWithClassName>(props: WithVariantProps<P>): P => {
  const { variants, variant, ...mainProps }  = props;
      
    const customProps = getCustomPropsFromVariant(variants, variant);

    const mergedProps = {
      ...mainProps,
      ...customProps
    }

    const { classes, fixedClasses, className, ...componentProps } = mergedProps;
  
    const mergedClasses: string = mergeClasses(className, classes, fixedClasses);
    
    if (mergedClasses) {
      (componentProps as P).className = mergedClasses;
    }

    return componentProps as P;
}

const withVariants = <P extends ObjectWithClassName>(WrappedComponent: React.ComponentType<P>) => {
  return class extends React.Component<WithVariantProps<P>> {
    render() {
      const props = parseVariant(this.props)
      
      return <WrappedComponent { ...props } />
    }
  }
}

export default withVariants;
