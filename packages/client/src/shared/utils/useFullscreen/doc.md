##### useFullscreen :: [react hook] :: 0.0.1

## React 19

---

# About:
`useFulscreen` is a react-hook to reuse fullscreen api logic.

# Use:

```

const [element, { enter, exit, toggle }] = useFullscreen();

```

`element`   | An HTMLElement in fullscreen mode at this moment
`enter`     | callback to set fullscreen active
`exit`     | callback to set fullscreen inactive
`toggle`     | callback to toggle current mode
