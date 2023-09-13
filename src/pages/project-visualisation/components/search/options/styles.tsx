import styled from 'styled-components';
import { Badge } from 'antd';

export const StyledBadge = styled(Badge)`
  && {
    .ant-badge-status-dot {
      height: 8px;
      width: 8px;
    }

    .ant-badge-status-text {
      color: #414141;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.98px;
    }
  }
`;

export const TypeItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const EdgeTypeItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .edge-name {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .related-nodes {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .edge-property {
    display: flex;
    gap: 0.5rem;

    .edge-name {
      color: #414141;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 1.4px;
    }

    span {
      color: #414141;
      letter-spacing: 0.98px;
      font-size: 14px;
    }

    span:last-child {
      font-weight: 600;
    }
  }
`;

export const NodeItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 6px;

  .node-property {
    display: flex;
    gap: 0.5rem;

    .node-name {
      color: #414141;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 1.4px;
    }

    span {
      color: #414141;
      letter-spacing: 0.98px;
      font-size: 14px;
    }

    span:last-child {
      font-weight: 600;
    }
  }
`;

export const NodePropertyItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .node-name {
    color: #414141;
    letter-spacing: 1.4px;
    font-weight: 600;
    font-size: 20px;
  }
`;
