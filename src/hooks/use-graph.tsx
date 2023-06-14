import React, { useEffect } from 'react';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { initGraph } from 'components/layouts/components/visualisation/container/initial/graph';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

export const useGraphRef = () => {
  const { graph, setGraph } = useGraph() ?? {};

  const ref: GraphRef = React.useRef(null);

  useEffect(() => {
    if (graph === undefined) {
      setGraph(initGraph(ref.current as HTMLDivElement));
    }
  }, [graph, setGraph]);

  return ref;
};
