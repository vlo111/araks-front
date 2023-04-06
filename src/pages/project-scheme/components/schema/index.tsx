import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_TYPES, useGetTypes } from 'api/schema/use-get-types';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { initGraph, initNodes } from 'components/layouts/components/schema/helpers/utils/graph-utils';
import 'components/layouts/components/schema/helpers/register-graph';
import { formattedTypes } from '../../../../components/layouts/components/schema/helpers/utils/utils';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

export const Schema: React.FC = () => {
  const { id } = useParams();
  const { graph, setGraph, setOpenLinkPropertyModal, ...params } = useSchema() ?? {};

  const ref: GraphRef = React.useRef(null);

  useGetTypes(
    {
      url: GET_TYPES,
      projectId: id ?? '',
    },
    {
      enabled: !!id,
      onSuccess: ({ data: { projectsNodeTypes } }) => {
        const cells = formattedTypes(graph, projectsNodeTypes);

        initNodes(graph, cells, setOpenLinkPropertyModal);
      },
    }
  );

  useEffect(() => {
    if (graph === undefined && setGraph !== undefined) {
      setGraph(initGraph(ref.current as HTMLDivElement, params));
    }
  }, [graph, setGraph, params]);

  return <div style={{ position: 'fixed', width: '1500px', height: '900px' }} ref={ref} />;
};
