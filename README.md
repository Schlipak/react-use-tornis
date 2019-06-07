# React useTornis - Hooks for [Tornis](https://github.com/robb0wen/tornis)

Hooks for Tornis which allow your components to track mouse and scroll position and velocity, and viewport size.

## Hooks

### useTornis

```
useTornis(
  updateCallback: (TornisState) => void,
  callOnWatch?: boolean = true,
  dependencies?: Array<string> = []
) => void
```

This hook is a direct equivalent to the basic usage of Tornis. The callback passed to it will be called with the Tornis state object as a parameter. The callback function is called on subscribe if `callOnWatch` is true. You can also specify dependencies, in which case the hook will only be called when one of the dependencies changed.

```js
import React, { useState } from 'react';
import useTornis from 'react-use-tornis';

const ProgressBar = () => {
  const [percent, setPercent] = useState(0);

  useTornis(({ scroll, size }) => {
    setPercent(scroll.top / (document.body.scrollHeight - size.y));
  }, true, ['scroll', 'size']);

  return (
    <div className="progress-bar" style={{ transform: `scaleX(${percent})` }} />
  );
};

export default ProgressBar;
```

### Property-specific hooks

This library also exposes specialised hooks that focus on a subset of the values Tornis handles. These work the same way as the `useTornis` hook, but do not take any dependencies.
The available hooks are:

* useMouse
* useScroll
* useSize
* useOrientation
  - This hook will always return `undefined` in the current version, as it is not supported by Tornis yet.
