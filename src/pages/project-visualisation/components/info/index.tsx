import styled from 'styled-components';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`
  position: fixed;
  width: auto;
  left: 500px;
  bottom: 10px;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .info {
    display: flex;
    gap: 1rem;
    border-radius: 4px;
    border: 1px solid #fff;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
    backdrop-filter: blur(7px);
    padding: 10px 24px;

    .node-count {
      color: #414141;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1.12px;
    }

    .info-text {
      color: #808080;
    }

    .node-info {
      display: flex;
      gap: 0.3rem;
    }
  }
`;

export const GraphInfo = () => {
  const { graph, graphInfo } = useGraph() ?? {};

  const [info, setInfo] = useState<number>();

  useEffect(() => {
    setInfo(graph?.getNodes().length ?? 0);
  }, [graph]);

  return (
    <Wrapper>
      <div className="info">
        <span className="node-count info-text">Visualized nodes</span>
        <div className="node-info">
          <div className="node-count">{graphInfo?.nodeCount}</div>
          <div className="node-count">of</div>
          <div id="node-initial-count" className="node-count">
            {info}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
