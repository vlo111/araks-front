import React, { useCallback } from 'react';
import { Graph } from '@antv/x6';

import { useSchema } from '../provider';
import { FitType } from './fit-type';
import { FitSchema } from './fit-schema';
import { ZoomIn } from './zoom-in';
import { ZoomOut } from './zoom-out';


export const Toolbar: React.FC = () => {
  const { graph, selectedNode } = useSchema();

  const onCenterContent = useCallback(() => {
    if (graph instanceof Graph) {
      graph.centerContent();

      graph.zoomToFit({ padding: 10, maxScale: 1 });
    }
  }, [graph]);

  const onCenterType = useCallback(() => {
    if (typeof selectedNode !== 'boolean' && selectedNode !== undefined) {
      if (graph instanceof Graph) {
        graph.centerCell(selectedNode);
      }
    }
  }, [graph, selectedNode]);

  const onZoomIn = useCallback(() => {
    if (graph instanceof Graph) {
      graph.zoom(0.1, {
        minScale: 0.5,
        maxScale: 3,
      });
    }
  }, [graph]);

  const onZoomOut = useCallback(() => {
    if (graph instanceof Graph) {
      graph.zoom(-0.1, {
        minScale: 0.5,
        maxScale: 3,
      });
    }
  }, [graph]);

  return (
    <>
      <FitType onCenterType={onCenterType} />
      <FitSchema onCenterContent={onCenterContent} />
      <div className="box zoom">
        <ZoomIn onZoomIn={onZoomIn} />
        <div className="separate" />
        <ZoomOut onZoomOut={onZoomOut} />
      </div>
    </>
  );
};
