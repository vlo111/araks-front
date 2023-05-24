import React, { useCallback } from 'react';
import { FitType } from './action/fit-type';
import { FitSchema } from './action/fit-schema';
import { ZoomIn } from './action/zoom-in';
import { ZoomOut } from './action/zoom-out';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { LINE_HEIGHT } from 'components/layouts/components/schema/container/register/node';
import { animateGraphFit } from 'components/layouts/components/schema/helpers/utils';
import { ToolbarWrapper } from './wrapper';

export const Toolbar: React.FC<{ position: string }> = ({ position }) => {
  const { graph, selectedNode } = useSchema() || {};

  const onCenterType = useCallback(() => {
    /** calculate height of type before fit on center */
    if (typeof selectedNode !== 'string' && selectedNode !== undefined) {
      animateGraphFit(graph, '0.4s');

      graph.zoom(0.5, {
        minScale: 2,
        maxScale: 2,
      });

      const propertiesHeight = selectedNode.ports.items.length * LINE_HEIGHT * 2;

      const height = (propertiesHeight + selectedNode.getSize().height) / 2;

      graph.options.height = graph.options.height - height;

      graph.centerCell(selectedNode);

      /** reset graph height after fit on center */
      graph.options.height = graph.options.height + height;
    }
  }, [graph, selectedNode]);

  const onCenterContent = useCallback(() => {
    animateGraphFit(graph, '0.4s');
    graph.zoomToFit({ padding: 10, maxScale: 1 });
  }, [graph]);

  const onZoomIn = useCallback(() => {
    animateGraphFit(graph, '0.05s');
    graph.zoom(0.1, {
      minScale: 0.2,
      maxScale: 3,
    });
  }, [graph]);

  const onZoomOut = useCallback(() => {
    animateGraphFit(graph, '0.05s');
    graph.zoom(-0.1, {
      minScale: 0.2,
      maxScale: 3,
    });
  }, [graph]);

  return (
    <ToolbarWrapper position={position}>
      <FitType onCenterType={onCenterType} />
      <FitSchema onCenterContent={onCenterContent} />
      <div className="box zoom">
        <ZoomIn onZoomIn={onZoomIn} />
        <div className="separate" />
        <ZoomOut onZoomOut={onZoomOut} />
      </div>
    </ToolbarWrapper>
  );
};
