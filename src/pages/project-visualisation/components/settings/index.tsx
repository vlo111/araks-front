import { Wrapper } from './style';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Divider, Dropdown, Menu } from 'antd';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { ReactComponent as RadialSvg } from './icons/radial.svg';
import { ReactComponent as ConcentricSvg } from './icons/concentric.svg';
import { ReactComponent as CircularSvg } from './icons/circular.svg';
import { ReactComponent as GridSvg } from './icons/grid.svg';
import { createCombos } from 'components/layouts/components/visualisation/helpers/utils';
import { LayoutConfig, LayoutType } from './types';
import { ReactComponent as ResetSvg } from './icons/reset.svg';
import { useGetData } from 'api/visualisation/use-get-data';
import { formattedData } from 'components/layouts/components/visualisation/helpers/format-node';
import { initData } from 'components/layouts/components/visualisation/container/initial/nodes';

export const Settings = () => {
  const { graph, setGraphInfo } = useGraph() || {};
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('radial');

  const [isReseat, setIsReseat] = useState(false);

  const { nodes, edges, count } = useGetData({
    enabled: isReseat,
  });

  useEffect(() => {
    if (isReseat) {
      const data = formattedData(nodes ?? [], edges ?? []);
      if (data !== undefined) initData(graph, data);
      setGraphInfo({
        nodeCount: (count ?? 0) > 300 ? 300 : count,
      });

      graph.render();
      setIsReseat(false);
    }
  }, [count, edges, graph, isReseat, nodes, setGraphInfo]);

  const setLayout = useCallback(
    (layout: LayoutType) => {
      if (graph) {
        setSelectedLayout(layout);
        const params = { type: layout };
        const layoutConfig: LayoutConfig = {
          concentric: {
            maxLevelDiff: 0.5,
            sortBy: 'topology',
            edgeLength: 10,
            preventOverlap: true,
            nodeSize: 80,
          },
          grid: {
            begin: [0, 0],
            preventOverlap: true,
            preventOverlapPadding: 20,
            nodeSize: 30,
            condense: false,
            rows: 5,
            cols: 5,
            sortBy: 'topology',
            workerEnabled: true,
          },
          circular: {
            ordering: 'topology',
          },
          radial: {
            type: 'gForce',
            center: [window.innerWidth, window.innerHeight],
            linkDistance: 100,
            nodeStrength: 600,
            edgeStrength: 200,
            nodeSize: 30,
            workerEnabled: true,
            gpuEnabled: true,
          },
        };

        graph.updateLayout({ ...params, ...layoutConfig[layout] });
      }
    },
    [graph]
  );

  const layoutIcons: Record<LayoutType, JSX.Element> = useMemo(
    () => ({
      radial: <RadialSvg />,
      concentric: <ConcentricSvg />,
      grid: <GridSvg />,
      circular: <CircularSvg />,
    }),
    []
  );

  const menu = (
    <Menu
      style={{
        gap: '0.4rem',
        display: 'flex',
        padding: '12px',
        flexDirection: 'column',
      }}
    >
      {(['radial', 'concentric', 'grid', 'circular'] as LayoutType[]).map((layout, index) => (
        <>
          <Menu.Item
            key={index}
            onClick={() => setLayout(layout)}
            style={{ backgroundColor: layout === selectedLayout ? '#f0f0f0' : 'transparent', padding: 0 }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.4rem 4px',
                color: ' #414141',
                fontSize: '20px',
                fontWeight: 500,
                letterSpacing: '1.4px',
              }}
            >
              {layoutIcons[layout]} {layout.charAt(0).toUpperCase() + layout.slice(1)}
            </div>
            {index < 3 ? <Divider style={{ margin: 0, borderBottom: '1px solid #C2C5D3' }} /> : <></>}
          </Menu.Item>
        </>
      ))}
    </Menu>
  );

  return (
    <Wrapper>
      <Button
        className="reset"
        icon={<ResetSvg />}
        onClick={() => {
          setIsReseat(true);
        }}
      >
        Reset
      </Button>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button className="layout" style={{ display: 'flex' }} icon={layoutIcons[selectedLayout]}>
          {selectedLayout.charAt(0).toUpperCase() + selectedLayout.slice(1)}
        </Button>
      </Dropdown>
      <Button className="combo" onClick={() => createCombos(graph)}>
        Combo
      </Button>
    </Wrapper>
  );
};
