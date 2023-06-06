import React, { useState } from 'react';
import { PopoverProps } from 'antd';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import { ActionDots } from 'components/actions/dots';
import { EditConnectionTypePropertyMenu } from 'components/menu/edit-connection-type-property-menu';
import { ManageNodeTypePopover } from 'components/popover';

type Props = PopoverProps & {
  connectionData: EdgeTypePropertiesResponse;
};

/** @deprecated as connection edit functionality m,oved to setting icon on right side header */
export const ConnectionTypeEdit = React.memo(({ children, connectionData, ...props }: Props) => {
  const [isManageOpened, setManageOpened] = useState(false);

  return (
    <>
      {children}
      <ManageNodeTypePopover
        content={
          <EditConnectionTypePropertyMenu
            connectionData={connectionData}
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
          style={{ position: 'absolute', right: '5px', top: '30%', cursor: 'pointer' }}
          onClick={() => setManageOpened(true)}
        />
      </ManageNodeTypePopover>
    </>
  );
});
