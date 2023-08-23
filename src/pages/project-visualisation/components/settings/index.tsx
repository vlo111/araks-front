import { Wrapper } from './style';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useCallback, useMemo } from 'react';
import { Button, Dropdown } from 'antd';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';

export const Settings = () => {
  const { graph } = useGraph() ?? {};

  const setLayout = useCallback(
    (layout: string) => {
      if (graph !== undefined) {
        const params = {
          type: layout,
        };

        if (layout === 'concentric') {
          graph.updateLayout({
            maxLevelDiff: 0.5,
            sortBy: 'topology',
            edgeLength: 10,
            preventOverlap: true,
            nodeSize: 80,
            ...params,
          });
        } else if (layout === 'grid') {
          graph.updateLayout({
            begin: [0, 0],
            preventOverlap: true,
            preventOverlapPadding: 20,
            nodeSize: 30,
            condense: false,
            rows: 5,
            cols: 5,
            sortBy: 'topology',
            workerEnabled: true,
            ...params,
          });
        } else if (layout === 'circular') {
          graph.updateLayout({
            ordering: 'topology',
            ...params,
          });
        } else if (layout === 'radial') {
          graph.updateLayout({
            linkDistance: 400,
            maxIteration: 1000,
            unitRadius: 100,
            preventOverlap: true,
            strictRadial: true,
            workerEnabled: false,
            ...params,
          });
        }
      }
    },
    [graph]
  );

  const items: ItemType[] = useMemo(
    () => [
      {
        key: '0',
        label: <div onClick={() => setLayout('radial')}>Radial</div>,
      },
      {
        type: 'divider',
      },
      {
        key: '1',
        label: <div onClick={() => setLayout('concentric')}>Concentric</div>,
      },
      {
        type: 'divider',
      },
      {
        key: '2',
        label: <div onClick={() => setLayout('grid')}>Grid</div>,
      },
      {
        type: 'divider',
      },
      {
        key: '3',
        label: <div onClick={() => setLayout('circular')}>Circular</div>,
      },
    ],
    [setLayout]
  );

  return (
    <Wrapper>
      <Dropdown overlayClassName="layout-drop-down" menu={{ items }} trigger={['click']}>
        <Button>Set Layout</Button>
      </Dropdown>
    </Wrapper>
  );
};
