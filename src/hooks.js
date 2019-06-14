import { useEffect } from 'react';
import { watchViewport, unwatchViewport } from 'tornis';

const depHasChanged = (deps, values) => deps.some(dep => values[dep] && values[dep].changed);

const useTornis = (updateCallback, callOnWatch = true, dependencies = []) => {
  const callback = (values) => {
    if (dependencies.length === 0 || depHasChanged(dependencies, values)) {
      updateCallback(values);
    }
  };

  useEffect(() => {
    watchViewport(callback, callOnWatch);

    return () => unwatchViewport(callback);
  });
};

const compose = (property, updateCallback, callOnWatch = true) => {
  const callback = (values) => {
    updateCallback(values[property]);
  };

  useTornis(callback, callOnWatch);
};

export const useSize = (updateCallback, callOnWatch = true) => compose(
  'size',
  updateCallback,
  callOnWatch,
);

export const useScroll = (updateCallback, callOnWatch = true) => compose(
  'scroll',
  updateCallback,
  callOnWatch,
);

export const useMouse = (updateCallback, callOnWatch = true) => compose(
  'mouse',
  updateCallback,
  callOnWatch,
);

export const useOrientation = (updateCallback, callOnWatch = true) => compose(
  'orientation',
  updateCallback,
  callOnWatch,
);

export default useTornis;
