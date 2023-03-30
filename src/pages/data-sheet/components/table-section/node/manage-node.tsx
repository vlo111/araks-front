import { Drawer } from 'antd';
import { AddNodeForm } from 'components/form/add-node-form';
import { useState } from 'react';

export const ManageNode = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    right: 0,
    top: '63px',
    overflow: 'hidden',
    textAlign: 'center',
    // background: token.colorFillAlter,
    // border: `1px solid ${token.colorBorderSecondary}`,
    // borderRadius: token.borderRadiusLG,
  };
  return (
    <div style={containerStyle}>
      <Drawer
        title="Add New Node / Nuclear physic"
        placement="top"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
        style={{ marginRight: '135px' }}
      >
        <AddNodeForm />
      </Drawer>
    </div>
  );
};
