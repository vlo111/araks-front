import React, { useEffect } from 'react';
import { initGraph } from 'components/layouts/components/schema/container/initial/graph';
import { useSchema } from 'components/layouts/components/schema/wrapper';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

export const useSchemaRef = () => {
  const data = useSchema() ?? {};

  const { graph, setGraph, ...params } = data;

  const ref: GraphRef = React.useRef(null);

  useEffect(() => {
    if (graph === undefined && setGraph !== undefined) {
      setGraph(initGraph(ref.current as HTMLDivElement, params));
    }
  }, [graph, setGraph, params]);

  return ref;
};
