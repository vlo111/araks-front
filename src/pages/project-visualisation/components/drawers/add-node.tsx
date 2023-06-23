import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import React from 'react';
import { Drawer } from 'components/drawer/node-drawer/view-node-drawer';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { useGetTypes } from 'api/schema/type/use-get-types';
import { useParams } from 'react-router-dom';
import './add-node-select.css';
import { TreeSelect } from "antd";

export const NodeEdit: React.FC = () => {
  const { id } = useParams();

  const { openNodeCreate, finishOpenNodeCreate } = useGraph() ?? {};

  const { nodes } = useGetTypes({ projectId: id ?? '' });

  return (
    <Drawer
      headerStyle={{
        borderTop: `6px solid yellow`,
      }}
      onClose={finishOpenNodeCreate}
      closable={false}
      title={
        <TreeSelect
          className={'node-type-select'}
          popupClassName={'node-type-popup-select'}
          treeData={createNodesTree(nodes ?? [])}
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Select Type"
          treeDefaultExpandAll
          fieldNames={{ value: 'key' }}
        />
      }
      open={openNodeCreate?.isOpened}
    >
      Add node
    </Drawer>
  );
};
