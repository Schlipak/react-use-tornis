import React, { useRef } from 'react';

import useTornis from './hooks';

const withTornis = (updateCallback, ChildComponent) => {
  const WithTornisHOC = (props) => {
    const ref = useRef();

    useTornis((viewportState) => {
      const { current: element } = ref;

      updateCallback(element, viewportState, props);
    });

    return <ChildComponent ref={ref} />;
  };

  return WithTornisHOC;
};

export default withTornis;
