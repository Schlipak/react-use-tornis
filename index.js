import { useEffect } from 'react';
import { watchViewport, unwatchViewport } from 'tornis';

export default (updateCallback) => {
  useEffect(() => {
    watchViewport(updateCallback);

    return () => unwatchViewport(updateCallback);
  });
};
