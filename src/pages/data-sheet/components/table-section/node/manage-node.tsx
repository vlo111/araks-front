import { Drawer } from 'antd';
import { Button } from 'components/button';
import { AddNodeForm } from 'components/form/add-node-form';
import { useState } from 'react';

export const ManageNode = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    padding: 48,
    right: 0,
    overflow: 'hidden',
    textAlign: 'center',
    // background: token.colorFillAlter,
    // border: `1px solid ${token.colorBorderSecondary}`,
    // borderRadius: token.borderRadiusLG,
  };
  return (
    <div style={containerStyle}>
      Render in this
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
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
