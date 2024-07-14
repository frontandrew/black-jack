export type FullscreenControls = {
  enter: (element: Element, options?: FullscreenOptions) => Promise<void>
  exit: () => Promise<void>
  toggle: (element: Element, options?: FullscreenOptions) => Promise<void>
}

export type useFullscreenType = () => [
  controls: FullscreenControls,
  fullscreenElement: Element | null
]
