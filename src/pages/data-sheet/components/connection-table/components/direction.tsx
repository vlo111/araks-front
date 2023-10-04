import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import styled from 'styled-components';
import { ConnectionInverseIcon } from 'components/icon/connection-inversion-icons';
import { ConnectionOneDirectionIcon } from 'components/icon/connection-one-direction-icon';
import { Skeleton } from 'antd';
import { TreeConnectionType } from 'pages/data-sheet/types';
import { DefaultOptionType } from 'antd/es/cascader';

const StyledCustomColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: '100%';
  height: '100%';
  margin: 0;
  padding: 0;

  .center {
    padding: 0 16px;
  }
`;

type Props = {
  data: EdgeTypePropertiesResponse | TreeConnectionType | DefaultOptionType | undefined;
};
export const EdgeDirection = ({ data }: Props) => {
  if (!data) {
    return <Skeleton title={{ width: 50 }} paragraph={false} />;
  }
  return (
    <StyledCustomColumn>
      <div className="center">
        {data?.inverse === true ? (
          <ConnectionInverseIcon firstColor={data?.source?.color} secondColor={data?.target?.color} />
        ) : (
          <ConnectionOneDirectionIcon firstColor={data?.source?.color} secondColor={data?.target?.color} />
        )}
      </div>
    </StyledCustomColumn>
  );
};
