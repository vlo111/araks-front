import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_TYPES, useGetTypes } from '../../../../api/schema/use-get-types';
import { useSchema } from '../../../../components/layouts/components/schema/wrapper';
import { Graph } from '@antv/x6';
import { antTheme } from '../../../../helpers/ant-theme';
import { EdgeCreate } from '../../../../components/layouts/components/schema/types';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

export const Schema: React.FC = () => {
  const { id } = useParams();
  const { setGraph, graph } = useSchema() ?? {};

  const ref: GraphRef = React.useRef(null);

  const { nodes } = useGetTypes(
    {
      url: GET_TYPES,
      projectId: 'db1159f6-d810-499c-9a8e-932663a715f0',
    },
    {
      enabled: !!id,
      onSuccess: ({ data: { projectsNodeTypes } }) => {
        // eslint-disable-next-line no-console
        console.log(projectsNodeTypes, 'success type ------');
      },
    }
  );

  useEffect(() => {
    if (graph === undefined && setGraph !== undefined) {
      const chart = new Graph({
        container: ref.current as HTMLDivElement,
        panning: true, // move chart
        height: window.innerHeight - 84 - 44,
        background: { color: antTheme.components.Schema.colorBg },
        grid: {
          size: 10,
          visible: true,
          type: 'doubleMesh',
          args: [
            {
              color: antTheme.components.Schema.colorGridThickness,
              thickness: 1,
            },
            {
              color: antTheme.components.Schema.colorGridLine,
              thickness: 2,
              factor: 10,
            },
          ],
        },
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: true,
          modifiers: 'ctrl',
          minScale: 0.5,
          maxScale: 3,
        },
        autoResize: true,
        connecting: {
          connector: 'smooth',
          router: {
            name: 'er',
            args: {
              offset: 'center',
              direction: 'H',
            },
          },
          validateEdge(item: EdgeCreate) {
            // eslint-disable-next-line no-console
            console.log(item);

            return false;
          },
          createEdge(item) {
            return this.createEdge({
              shape: 'er-edge',
              router: {
                name: 'normal',
              },
              attrs: {
                line: {
                  sourceMarker: {
                    name: 'path',
                    d: '',
                  },
                  strokeDasharray: '5 5',
                  stroke: item.sourceCell.attr('body/stroke'),
                },
              },
              zIndex: -1,
            });
          },
        },
      });

      setGraph(chart);
    }
  }, [graph, nodes.length, setGraph]);

  return <div ref={ref} />;
};
