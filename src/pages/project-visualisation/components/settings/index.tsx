import { ReactComponent as SettingsSVG } from './setting.svg';
import { Items, Wrapper, Layout } from './style';
import { useEffect, useState } from 'react';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';

export const Settings = () => {
  const { graph } = useGraph() ?? {};
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
          center: [window.innerWidth / 3, window.innerHeight / 3],
        });
      } else if (layout === 'grid') {
        graph.updateLayout({
          type: 'grid',
          center: [window.innerWidth / 3, window.innerHeight / 3],
          begin: [0, 0],
          preventOverlap: true,
          preventOverlapPdding: 20,
          nodeSize: 30,
          condense: false,
          rows: 5,
          cols: 5,
          sortBy: 'degree',
          workerEnabled: true,
        });
      } else if (layout === 'fruchterman') {
        graph.updateLayout({
          type: 'fruchterman',
          center: [window.innerWidth / 3, window.innerHeight / 3],
          gravity: 8,
          speed: 10,
          clustering: true,
          clusterGravity: 5,
        });
      } else if (layout === 'cluster') {
        graph.updateLayout({
          type: 'fruchterman',
          center: [window.innerWidth / 3, window.innerHeight / 3],
          gravity: 50,
          speed: 50,
          clustering: true,
          clusterGravity: 20,
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
        <Layout className="item" onClick={() => setLayout('fruchterman')}>
          Fruchterman Reingold
        </Layout>
        <Layout className="item" onClick={() => setLayout('concentric')}>
          Concentric
        </Layout>
        <Layout className="item" onClick={() => setLayout('cluster')}>
          Clustering
        </Layout>
        <Layout className="item" onClick={() => setLayout('grid')}>
          Grid
        </Layout>
      </Items>
    </Wrapper>
  );
};
