import { PlusOutlined } from '@ant-design/icons';
import { AddTypePropertyForm } from 'components/form/add-type-property-form';
import { AddNodeTypePopover } from 'components/popover';
import { useState } from 'react';

export const AddNewConnection = () => {
  const [open, setOpen] = useState(false);

  const handleExtraClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOpen(true);
  };

  return (
    <AddNodeTypePopover
      content={<AddTypePropertyForm hide={() => setOpen(false)} isConnectionType />}
      trigger="click"
      open={open}
      placement="right"
      align={{ offset: [20, 0] }}
      autoAdjustOverflow={false}
      onOpenChange={(open: boolean) => {
        !open && setOpen(false);
        return open;
      }}
    >
      <PlusOutlined style={{ cursor: 'pointer' }} onClick={handleExtraClick} />
    </AddNodeTypePopover>
  );
};
