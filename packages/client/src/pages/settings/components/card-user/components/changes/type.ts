export type PropsChange = {
  isOpen: boolean
  handle: () => void
  rest: {
    type: string
    title: string
    lable: string
    button: string
  }
}
