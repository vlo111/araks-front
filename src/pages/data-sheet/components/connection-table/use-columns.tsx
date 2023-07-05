import { Skeleton } from 'antd';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useGetProjectsEdgeTypeProperties } from 'api/node-edge-type/use-get-projects-edge-type-properties';
import { ManageConnectionTypeProperty } from '../table-section/type-property/manage-connection-type-property';
import { Target } from './components/target';
import { EdgeDirection } from './components/direction';
import { Source } from './components/source';

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
      title: () => <Source sourceData={data?.source} />,
      dataIndex: 'source',
      className: 'connection-column connection-first-column', // connection-column -need to set for all columns to calculate width by this
      key: 'source',
      width: '150px',
      fixed: true,
    },
    {
      title: () => <EdgeDirection data={data} />,
      dataIndex: 'connection-type',
      className: 'connection-column connection-first-column connection-type', // connection-column -need to set for all columns to calculate width by this
      key: 'connection-type',
      width: '50px',
      fixed: true,
    },
    {
      title: () => <Target dataTarget={data?.target} />,
      dataIndex: 'target',
      className: 'connection-column connection-first-column fixed-border', // connection-column -need to set for all columns to calculate width by this
      key: 'target',
      fixed: true,
      width: '150px',
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
            dataIndex: item.id,
            className: 'connection-column',
          };
        })
      : []),
  ];

  return columns;
};
