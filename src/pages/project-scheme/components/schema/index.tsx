import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { GET_TYPES, useGetTypes } from 'api/schema/use-get-types';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { initGraph } from 'components/layouts/components/schema/helpers/utils/graph-utils';
import 'components/layouts/components/schema/helpers/register-graph';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

export const Schema: React.FC = () => {
  const { id } = useParams();
  const { ...params } = useSchema() ?? {};

  const ref: GraphRef = React.useRef(null);

  const { nodes } = useGetTypes(
    {
      url: GET_TYPES,
      projectId: id ?? '', //'db1159f6-d810-499c-9a8e-932663a715f0',
    },
    {
      enabled: !!id,
      onSuccess: ({ data: { projectsNodeTypes } }) => {
        // eslint-disable-next-line no-console
        // console.log(params, 'success type ------');
      },
    }
  );

  // const getNodes = useMemo(() => {
  //   if (nodes.length > 0) {
  //     const cells: Cell[] = [];
  //
  //     nodes?.forEach((item) => {
  //       if (item.shape === 'er-edge') {
  //         // const newItem = _.cloneDeep(item);
  //         // InitPortColors(newItem);
  //
  //         cells.push(params.graph.createEdge(item));
  //       } else {
  //         // eslint-disable-next-line no-debugger
  //         debugger
  //         cells.push(params.graph.createNode(item));
  //       }
  //     });
  //
  //     params.graph.resetCells(cells);
  //
  //     params.graph.zoomToFit({ padding: 10, maxScale: 1 });
  //     // eslint-disable-next-line no-debugger
  //     debugger
  //   }
  //   return nodes
  // }, [nodes, params.graph])
  //
  // // eslint-disable-next-line no-console
  // console.log(getNodes, 'nnn');

  useEffect(() => {
    const { graph, setGraph } = params;

    if (graph === undefined && setGraph !== undefined &&nodes.length > 0 ) {
      // eslint-disable-next-line no-console
      setGraph(initGraph(ref.current as HTMLDivElement, params, nodes));
    }
  }, [params, nodes]);

  return <div style={{position: "fixed", width: '1500px', height: '900px'}} ref={ref} />;
};
