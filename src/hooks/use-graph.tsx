import React, { useEffect } from 'react';
import { initGraph } from 'components/layouts/components/schema/container/initial/graph';
import { useSchema } from 'components/layouts/components/schema/wrapper';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

export const useGraphRef = () => {
  const { graph, setGraph, ...params } = useSchema() ?? {};

  const ref: GraphRef = React.useRef(null);

  useEffect(() => {
    if (graph === undefined && setGraph !== undefined) {
      setGraph(initGraph(ref.current as HTMLDivElement, params));
    }
  }, [graph, setGraph, params]);

  return ref;
};
