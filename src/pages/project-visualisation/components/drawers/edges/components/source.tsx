import { Skeleton } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import styled from 'styled-components';
import { EdgeType } from 'types/node';

const StyledCustomColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  background: linear-gradient(139deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.2) 100%);
  box-shadow: 4px 0px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 0 0 16px;

  .text {
    padding-left: 16px;
  }

  .ant-space {
    gap: 4px !important;
  }

  .node-name {
    color: #666666;
    font-style: italic;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 170px;
  }
`;

type Props = {
  sourceData: EdgeType | undefined;
  nodeName: string | undefined;
};
export const SourceView = ({ sourceData, nodeName }: Props) => {
  if (!sourceData) {
    return <Skeleton title={{ width: 150 }} paragraph={false} />;
  }
  return (
    <StyledCustomColumn>
      <VerticalSpace className="left">
        <div style={{ height: '9px', backgroundColor: sourceData.color }}></div>
        <div className="text">{sourceData.name}</div>
        <div className="text node-name" title={nodeName}>
          {nodeName}
        </div>
      </VerticalSpace>
    </StyledCustomColumn>
  );
};
