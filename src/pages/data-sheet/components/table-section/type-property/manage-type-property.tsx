import { PopoverProps } from 'antd';
import { UserProjectRole } from 'api/types';
import { ActionDots } from 'components/actions/dots';
import { TypePropertyMenu } from 'components/menu/type-property-menu';
import { ManageNodeTypePopover } from 'components/popover';
import { useProject } from 'context/project-context';
import React, { useState } from 'react';

type Props = PopoverProps & {
  propertyId: string;
  isDefault: boolean;
  canSetDefault: boolean;
};

export const ManageTypeProperty = React.memo(({ children, propertyId, isDefault, canSetDefault, ...props }: Props) => {
  const [isManageOpened, setManageOpened] = useState(false);
  const { projectInfo } = useProject();

  return (
    <>
      {children}
      {projectInfo?.role === UserProjectRole.Owner && (
        <ManageNodeTypePopover
          content={
            <TypePropertyMenu
              isDefault={isDefault}
              propertyId={propertyId}
              canSetDefault={canSetDefault}
              closeManageNodes={() => setManageOpened(false)}
            />
          }
          open={isManageOpened}
          trigger="click" 
          onOpenChange={(open: boolean) => {
            !open && setManageOpened(false);
            return open;
          }}
          {...props}
        >
          <ActionDots
            style={{ position: 'absolute', right: '5px', top: '15px', cursor: 'pointer' }}
            onClick={() => setManageOpened(true)}
          />
        </ManageNodeTypePopover>
      )}
    </>
  );
});
