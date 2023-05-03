import styled from 'styled-components';
import { Skeleton } from 'antd';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useGetProjectsEdgeTypeProperties } from 'api/node-edge-type/use-get-projects-edge-type-properties';
import { VerticalSpace } from 'components/space/vertical-space';
import { ConnectionInverseIcon } from 'components/icon/connection-inversion-icons';
import { ConnectionOneDirectionIcon } from 'components/icon/connection-one-direction-icon';
import { ManageConnectionTypeProperty } from '../table-section/type-property/manage-connection-type-property';

const StyledCustomColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: '100%';
  height: '100%';
  margin: 0;
  padding: 0;

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

  .left {
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.1);
  }

  .right {
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
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
        dataIndex: 'skeleton',
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
      className: 'connection-column connection-first-column', // connection-column -need to set for all columns to calculate width by this
      key: 'label',
      fixed: true,
      width: '550px',
    },
    ...(data?.properties
      ? data.properties?.map((item) => {
          return {
            title: (
              <ManageConnectionTypeProperty
                propertyId={item.id}
                isDefault={false}
                canSetDefault={false}
              >{`${item.name} (${item.ref_property_type_id})`}</ManageConnectionTypeProperty>
            ),
            width: `${item.name} (${item.ref_property_type_id})`.length * 15,
            dataIndex: item.name,
            className: 'connection-column',
          };
        })
      : []),
  ];

  return columns;
};
