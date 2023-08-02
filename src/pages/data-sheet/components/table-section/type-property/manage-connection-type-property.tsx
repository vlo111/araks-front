import { PopoverProps } from 'antd';
import { UserProjectRole } from 'api/types';
import { ActionDots } from 'components/actions/dots';
import { ConnectionTypePropertyMenu } from 'components/menu/connection-type-property-menu';
import { ManageNodeTypePopover } from 'components/popover';
import { useProject } from 'context/project-context';
import React, { useState } from 'react';

type Props = PopoverProps & {
  propertyId: string;
  isDefault: boolean;
  canSetDefault: boolean;
};

export const ManageConnectionTypeProperty = React.memo(
  ({ children, propertyId, isDefault, canSetDefault, ...props }: Props) => {
    const { projectInfo } = useProject();
    const [isManageOpened, setManageOpened] = useState(false);

    return (
      <>
        {children}
        {projectInfo?.role === UserProjectRole.Owner && (
          <ManageNodeTypePopover
            content={
              <ConnectionTypePropertyMenu propertyId={propertyId} closeManageNodes={() => setManageOpened(false)} />
            }
            open={isManageOpened}
            trigger="click"
            onOpenChange={(open: boolean) => {
              !open && setManageOpened(false);
              return open;
            }}
          >
            <ActionDots
              style={{ position: 'absolute', right: '5px', cursor: 'pointer', top: '30%' }}
              onClick={() => setManageOpened(true)}
            />
          </ManageNodeTypePopover>
        )}
      </>
    );
  }
);
