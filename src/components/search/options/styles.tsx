import styled from 'styled-components';
import { Avatar, Badge, Typography } from 'antd';

export const StyledBadge = styled(Badge)`
  && {
    .ant-badge-status-dot {
      height: 24px;
      width: 24px;
    }

    .ant-badge-status-text {
      color: #232f6a;
      font-size: 18px;
      margin-left: 20px;
    }
  }
`;

export const TypeItem = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const ProjectWrapper = styled.div`
  display: flex;
`;

export const StyledTitle = styled(Typography)`
  color: #232f6a;
  font-size: 18px;
  font-weight: 400;
  margin-left: 20px;
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

export const StyledSearchTitle = styled(Typography)`
  color: #414141;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.4px;
  padding-bottom: 4px;
  border-bottom: 1px solid #dbddeb;
`;

export const StyledProjectName = styled(Typography)`
  color: #232f6a;
  font-size: 18px;
  font-weight: 500;
`;

export const StyledAvatar = styled(Avatar)<{ color: string }>`
  && {
    background: ${(props) => props.color};
    svg {
      display: flex;
      margin: 0 auto;
      height: 100%;
      font-size: 14px;
    }
  }
`;
