import { Form, TreeSelect } from 'antd';
import React from 'react';
import { TreeNodeType } from 'pages/data-sheet/types';
import '../add-node-select.css';

type DrawerHeader = React.FC<{
  onSearch: (value: string) => void;
  filteredData: TreeNodeType[];
  onClear: VoidFunction;
}>;

const DropDownStyle = {
  maxHeight: 400,
  overflow: 'auto',
  minWidth: '24rem',
  padding: '1rem 0',
};

export const NodeCreateDrawerHeader: DrawerHeader = ({ onSearch, filteredData, onClear }) => {
  return (
    <Form.Item name="parent_id" style={{ margin: 0, padding: '0 5px' }}>
      <TreeSelect
        onSearch={onSearch}
        className={'node-type-select'}
        popupClassName={'node-type-popup-select'}
        treeData={filteredData}
        style={{ width: '100%' }}
        dropdownStyle={DropDownStyle}
        onClear={onClear}
        rootClassName="node-type-select-dropdown"
        placeholder="Select Type"
        fieldNames={{ value: 'key' }}
        showSearch
        allowClear
        treeDefaultExpandAll
      ></TreeSelect>
    </Form.Item>
  );
};
