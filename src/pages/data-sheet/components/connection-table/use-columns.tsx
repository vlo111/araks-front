import styled from 'styled-components';
import { Skeleton } from 'antd';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useGetProjectsEdgeTypeProperties } from 'api/node-edge-type/use-get-projects-edge-type-properties';
import { VerticalSpace } from 'components/space/vertical-space';
import { ConnectionInverseIcon } from 'components/icon/connection-inversion-icons';
import { ConnectionOneDirectionIcon } from 'components/icon/connection-one-direction-icon';

const StyledCustomColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .text {
    text-align: center;
  }

  .center {
    padding: 0 16px;
    .inverseGradient {
      stop-color: 'red';
    }
  }

  .left,
  .right {
    padding-bottom: 16px;
  }
`;

export const useColumns = () => {
  const { nodeTypeId, isConnectionType } = useDataSheetWrapper();

  const { data, isInitialLoading } = useGetProjectsEdgeTypeProperties(nodeTypeId, {
    enabled: !!(nodeTypeId && isConnectionType === true),
  });

  if (isInitialLoading) {
    return [
      {
        title: <Skeleton paragraph={false} />,
        width: '100%',
        dataIndex: 'label',
      },
    ];
  }

  const columns = [
    {
      title: () => (
        <StyledCustomColumn>
          <VerticalSpace className="left">
            <div style={{ height: '9px', backgroundColor: data?.source.color }}></div>
            <div className="text">{data?.source.name}</div>
          </VerticalSpace>
          <div className="center">
            {data?.inverse === true ? (
              <ConnectionInverseIcon firstColor={data?.source.color} secondColor={data?.target.color} />
            ) : (
              <ConnectionOneDirectionIcon firstColor={data?.source.color} secondColor={data?.target.color} />
            )}
          </div>
          <VerticalSpace className="right">
            <div style={{ height: '9px', backgroundColor: data?.target.color }}></div>
            <div className="text">{data?.target.name}</div>
          </VerticalSpace>
        </StyledCustomColumn>
      ),
      dataIndex: 'label',
      key: 'label',
      fixed: true,
      width: '550px',
    },
    {
      key: 'space',
      dataIndex: 'space',
    },
  ];

  return columns;
};
