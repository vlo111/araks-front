import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { GET_TYPES, useGetTypes } from 'api/schema/use-get-types';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { formattedTypes } from 'components/layouts/components/schema/helpers/utils';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { initNodes } from 'components/layouts/components/schema/container/initial/nodes';
import { initGraph } from 'components/layouts/components/schema/container/initial/graph';
import 'components/layouts/components/schema/container/register';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

const Graph = styled.div`
  position: fixed;
  left: 250px;
  top: 152px;
  z-index: 0;
`;

export const Schema: React.FC = () => {
  const { id } = useParams();
  const { graph, setGraph, ...params } = useSchema() ?? {};

  const ref: GraphRef = React.useRef(null);

  useGetTypes(
    {
      url: GET_TYPES,
      projectId: id ?? '',
    },
    {
      enabled: !!id,
      onSuccess: ({ data: { projectsNodeTypes } }) => {
        params.setNodesTree(createNodesTree(projectsNodeTypes));

        initNodes(graph, formattedTypes(graph, projectsNodeTypes), params);
      },
    }
  );

  useEffect(() => {
    if (graph === undefined && setGraph !== undefined) {
      setGraph(initGraph(ref.current as HTMLDivElement, params));
    }
  }, [graph, setGraph, params]);

  return <Graph ref={ref} />;
};
