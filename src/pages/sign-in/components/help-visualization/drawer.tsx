import { Divider, Drawer, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import React, { Dispatch } from 'react';
import { ConnectedNodes } from './connected-nodes';
import { HelpNodeType, HelpTargetType } from '../type';

const { Text } = Typography;

export const DrawerComponent = ({
  open,
  setOpen,
  node,
  setNode,
  setEnabled,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  node: HelpNodeType;
  setNode: Dispatch<React.SetStateAction<string>>;
  setEnabled: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const constants: object = {
    placement: 'right',
    width: '950px',
    open,
    onClose: () => setOpen(false),
    style: {
      background: '#E0E0E0',
      padding: '20px',
    },
    closeIcon: <LeftOutlined />,
  };

  return (
    <>
      {node && (
        <Drawer title={node?.name} {...constants}>
          <div style={{ padding: '35px', display: 'grid', gridGap: '30px' }}>
            <Text>{node?.description}</Text>
            <Divider style={{ width: '2px', background: '#000' }} />
            <ConnectedNodes targets={node.target as HelpTargetType[]} setNode={setNode} setEnabled={setEnabled} />
          </div>
        </Drawer>
      )}
    </>
  );
};
