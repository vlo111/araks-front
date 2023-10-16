import styled from 'styled-components';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { FC } from 'react';

type Props = FC<{ collapsed?: boolean }>;

const Wrapper = styled.div`
  position: fixed;
  width: auto;
  bottom: 10px;
  transition: left 0.5s ease-in-out;
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

export const GraphInfo: Props = ({ collapsed }) => {
  const { graphInfo } = useGraph() ?? {};

  return graphInfo?.nodeCountAPI ? (
    <Wrapper style={{ left: collapsed ? '490px' : '30px' }}>
      <div className="info">
        <span className="node-count info-text">Visualized nodes</span>
        <div className="node-info">
          <div className="node-count">{graphInfo?.nodeCount ?? 0}</div>
          <div className="node-count">of</div>
          <div id="node-initial-count" className="node-count">
            {graphInfo?.nodeCountAPI ?? 0}
          </div>
        </div>
      </div>
    </Wrapper>
  ) : (
    <></>
  );
};
