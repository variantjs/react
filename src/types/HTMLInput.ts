export type WithChangeHandler = {
  changeHandler?: (value: any) => void,
}

export type WithState = {
  state?: [any, (value: any) => void],
}