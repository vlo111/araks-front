import { Tree } from "antd";
import type { DataNode, TreeProps } from 'antd/es/tree';
import { useState } from "react";


const treeData: DataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              disableCheckbox: true,
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
        },
      ],
    },
  ];

export const NodeTypes = () => {
    const [visible, setVisible] = useState(false);
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    return <Tree
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        onSelect={onSelect}
        treeData={treeData}
        style={!visible ? { display: 'none' } : {}}
    />
}