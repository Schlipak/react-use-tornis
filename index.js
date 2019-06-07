import { useEffect } from 'react';
import { watchViewport, unwatchViewport } from 'tornis';

const depHasChanged = (deps, values) => deps.some(dep => values[dep] && values[dep].changed);

export const useTornis = (updateCallback, dependencies = []) => {
  const callback = (values) => {
    if (dependencies.length === 0 || depHasChanged(dependencies, values)) {
      updateCallback(values);
    }
  };

  useEffect(() => {
    watchViewport(callback);

    return () => unwatchViewport(callback);
  });
};

const compose = (property, updateCallback) => {
  const callback = (values) => {
    updateCallback(values[property]);
  };

  useTornis(callback);
};

export const useSize = updateCallback => compose(
  'size',
  updateCallback,
);

export const useScroll = updateCallback => compose(
  'scroll',
  updateCallback,
);

export const useMouse = updateCallback => compose(
  'mouse',
  updateCallback,
);

export const useOrientation = updateCallback => compose(
  'orientation',
  updateCallback,
);

export default useTornis;
