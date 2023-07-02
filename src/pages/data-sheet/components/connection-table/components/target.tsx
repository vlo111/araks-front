import { Skeleton } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import styled from 'styled-components';
import { EdgeType } from 'types/node';

type Props = {
  dataTarget: EdgeType | undefined;
};

const StyledCustomColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: '100%';
  height: '100%';
  margin: 0;
  padding: 0;
  background: linear-gradient(139deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.2) 100%);
  box-shadow: 4px 0px 4px 0px rgba(0, 0, 0, 0.1);
  padding-bottom: 16px;

  .text {
    padding-left: 16px;
  }
`;

export const Target = ({ dataTarget }: Props) => {
  if (!dataTarget) {
    return <Skeleton title={{ width: 150 }} paragraph={false} />;
  }

  return (
    <StyledCustomColumn>
      <VerticalSpace className="right">
        <div style={{ height: '9px', backgroundColor: dataTarget.color }}></div>
        <div className="text">{dataTarget.name}</div>
      </VerticalSpace>
    </StyledCustomColumn>
  );
};
