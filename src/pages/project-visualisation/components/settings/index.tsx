import { ReactComponent as SettingsSVG } from './setting.svg';
import { Items, Wrapper, Layout } from './style';
import { useEffect, useState } from 'react';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';

export const Settings = () => {
  const { graph } = useGraph();
  const [layout, setLayout] = useState('');

  useEffect(() => {
    if (graph !== undefined) {
      if (layout === 'concentric') {
        graph.updateLayout({
          type: 'concentric',
          maxLevelDiff: 0.5,
          sortBy: 'degree',
          edgeLength: 10,
          preventOverlap: true,
          nodeSize: 80,
          center: [window.innerWidth / 3, window.innerHeight / 8],
        });
      } else if ('grid') {
        graph.updateLayout({
          type: 'grid',
          begin: [0, 0], // optional,
          preventOverlap: true, // optional, must match nodeSize
          preventOverlapPdding: 20, // optional
          nodeSize: 30, // optional
          condense: false, // optional
          rows: 5, // optional
          cols: 5, // optional
          sortBy: 'degree', // optional
          workerEnabled: true, // optional, enable web-worker
        });
      }
    }
  }, [layout, graph]);

  return (
    <Wrapper>
      <Items>
        <Layout>
          <span>Set Layout</span>
          <SettingsSVG />
        </Layout>
        <Layout className="item" onClick={() => setLayout('concentric')}>
          concentric
        </Layout>
        <Layout className="item" onClick={() => setLayout('grid')}>
          grid
        </Layout>
        <Layout className="item">lay 1</Layout>
      </Items>
    </Wrapper>
  );
};
