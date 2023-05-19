import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import client from "api/client";
import { GET_TYPES, useGetTypes } from "api/schema/type/use-get-types";
import { formattedTypes } from "components/layouts/components/schema/helpers/format-type";
import { initNodes } from "components/layouts/components/schema/container/initial/nodes";
import { initGraph } from "components/layouts/components/schema/container/initial/graph";
import { useSchema } from "components/layouts/components/schema/wrapper";

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

const Graph = styled.div`
  position: fixed;
  top: 152px;
  z-index: 0;
`;

export const RenderSchema = () => {
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
      onSuccess: async ({ data: { projectsNodeTypes } }) => {
        /** Get edges for format and render with types  */
        const { data: edges } = await client.get(`${process.env.REACT_APP_BASE_URL}projects-edge-type/${id}`);

        params.setEdges(edges);
        params.setNodes(projectsNodeTypes);

        initNodes(graph, formattedTypes(graph, projectsNodeTypes, edges), params);
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
