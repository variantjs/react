import { SyntheticEvent } from "react";
import { WithChangeHandler, WithState } from "../types";

export const handleStateAndChangeHandler = <P extends (WithChangeHandler & WithState & { onChange?: (e: K) => void , value?: any }), K extends SyntheticEvent>(
  props: P,
  getEventValue: (e: K) => any,
  assignStateValue = true
): Pick<P, Exclude<keyof P, "changeHandler" | "state">> => {
  const { changeHandler, state, ...inputProps } = props;

  let onChange

  if (state !== undefined) {
    const [currentState, setState] = state;

    if (assignStateValue) {
      inputProps.value = currentState
    }

    onChange = (e: K) => {
      const value = getEventValue(e);
      setState(value)

      if (typeof props.onChange === 'function') {
        props.onChange(e)
      }
    }
   }else if (changeHandler !== undefined) {
    onChange = (e: K) => {
      const value = getEventValue(e);
      changeHandler(value);

      if (typeof props.onChange === 'function') {
        props.onChange(e)
      }
    }
    
  }

  if (onChange !== undefined) {
    inputProps.onChange = onChange
  }

  return inputProps 
}
