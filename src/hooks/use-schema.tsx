import React, { useEffect } from 'react';
import { initGraph } from 'components/layouts/components/schema/container/initial/graph';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { useProject } from 'context/project-context';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

export const useSchemaRef = () => {
  const { projectInfo } = useProject();

  const { graph, setGraph, ...params } = useSchema() ?? {};

  const ref: GraphRef = React.useRef(null);

  useEffect(() => {
    if (graph === undefined && setGraph !== undefined && projectInfo?.role !== undefined) {
      setGraph(initGraph(ref.current as HTMLDivElement, params, projectInfo));
    }
  }, [graph, setGraph, params, projectInfo]);

  return ref;
};
