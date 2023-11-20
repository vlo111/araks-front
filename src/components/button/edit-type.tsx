import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { PopoverProps } from 'antd';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import { useGetProjectsEdgeTypeProperties } from 'api/node-edge-type/use-get-projects-edge-type-properties';
import { SettingsAction } from 'components/actions';
import { AddTypeForm } from 'components/form/add-type-form';
import { EditConnectionTypePropertyForm } from 'components/form/edit-connection-type-property-form';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { AddNodeTypePopover } from 'components/popover';
import { ManageConnection } from 'pages/data-sheet/components/table-section/node/manage-connection';
import { useMemo } from 'react';

export type EditTypeProps = PopoverProps & {
  onClick: () => void;
  icon?: Partial<CustomIconComponentProps>;
};

export const EditType = ({ onClick, icon, ...props }: EditTypeProps) => {
  const { nodeTypeId, isConnectionType } = useDataSheetWrapper();

  const { data } = useGetProjectsEdgeTypeProperties(nodeTypeId, {
    enabled: !!(nodeTypeId && isConnectionType === true),
  });

  const connectionData = useMemo(() => data as EdgeTypePropertiesResponse, [data]);

  return (
    <AddNodeTypePopover
      content={
        isConnectionType ? <EditConnectionTypePropertyForm connectionData={connectionData} /> : <AddTypeForm isEdit />
      }
      trigger="click"
      {...props}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {isConnectionType && <ManageConnection />}
        <SettingsAction icon={icon} button={{ onClick }} />
      </div>
    </AddNodeTypePopover>
  );
};
