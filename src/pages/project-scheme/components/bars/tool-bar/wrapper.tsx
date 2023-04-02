import React, { useCallback } from 'react';
import styled from "styled-components";

import { FitType } from './fit-type';
import { FitSchema } from './fit-schema';
import { ZoomIn } from './zoom-in';
import { ZoomOut } from './zoom-out';
import { useSchema } from 'components/layouts/components/schema/wrapper';

const ToolbarPanel = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 46px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .fit,
  .find {
    height: 46px;
    justify-content: center;

    &:hover {
      background-color: #e0e0e0;
    }

    &:active {
      svg {
        scale: 1.1;
      }
    }
  }

  .box {
    background: rgba(219, 219, 219, 0.5);
    border: 1px solid rgba(111, 111, 111, 0.16);
    box-shadow: 0 10px 10px rgba(141, 143, 166, 0.2);
    backdrop-filter: blur(7px);
    border-radius: 4px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .zoom {
    justify-content: center;
    flex-direction: column;
    height: 93px;

    .separate {
      border: 1px solid #cdcdcd;
      width: 80%;
    }

    .zoomIn,
    .zoomOut {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;

      &:hover {
        background-color: #e0e0e0;
      }

      &:active {
        svg {
          scale: 1.1;
        }
      }
    }
  }
`

export const ToolbarWrapper: React.FC = () => {
  const { graph, selectedNode } = useSchema() || {};

  const onCenterContent = useCallback(() => {
    graph.centerContent();
    graph.zoomToFit({ padding: 10, maxScale: 1 });
  }, [graph]);

  const onCenterType = useCallback(() => {
    if (typeof selectedNode !== 'boolean' && selectedNode !== undefined) {
      graph.centerCell(selectedNode);
    }
  }, [graph, selectedNode]);

  const onZoomIn = useCallback(() => {
    graph.zoom(0.1, {
      minScale: 0.5,
      maxScale: 3,
    });
  }, [graph]);

  const onZoomOut = useCallback(() => {
    graph.zoom(-0.1, {
      minScale: 0.5,
      maxScale: 3,
    });
  }, [graph]);

  return (
    <ToolbarPanel>
      <FitType onCenterType={onCenterType} />
      <FitSchema onCenterContent={onCenterContent} />
      <div className="box zoom">
        <ZoomIn onZoomIn={onZoomIn} />
        <div className="separate" />
        <ZoomOut onZoomOut={onZoomOut} />
      </div>
    </ToolbarPanel>
  );
};
