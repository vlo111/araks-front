import { SetStateAction, useState } from 'react';
import { Col, Drawer, Menu, Row, Space, TreeSelect } from 'antd';
import { ReactComponent as Helpicon } from 'components/help/images/help.svg';
import { ProjectsFolders } from './projects-and-folders';
import { OverviewSection } from './overview';
import { SchemaSection } from './schema-section';
import { DataSheetSection } from './data-sheet';
import { VisualizationSection } from './visualization';
import { Perspective } from './perspective';

type ItemType = {
  value: string;
  key: string;
  label: string;
  children?: ItemType[];
};
const items: ItemType[] = [
  {
    value: 'Projects and Folders',
    label: 'Projects and Folders',
    key: 'sub1',
    children: [
      {
        key: 'sub1-1',
        value: 'Create, Edit and Delete the Project',
        label: 'Create, Edit and Delete the Project',
      },
      {
        key: 'sub1-2',
        value: 'Create, Edit and Delete the Folder',
        label: 'Create, Edit and Delete the Folder',
      },
    ],
  },
  {
    label: 'Overview',
    value: 'Overview',
    key: 'sub4',
    children: [
      {
        key: 'sub4-1',
        label: 'Project name and Privacy',
        value: 'Project name and Privacy',
      },
      {
        key: 'sub4-2',
        label: 'See all members ',
        value: 'See all members ',
      },
      {
        key: 'sub4-2',
        label: 'Comments and Likes',
        value: 'Comments and Likes',
      },
    ],
  },
  {
    value: 'Schema section',
    label: 'Schema section',
    key: 'sub2',
    children: [
      {
        key: 'sub2-1',
        label: 'Create, Edit and Delete Type',
        value: 'Create, Edit and Delete Type',
      },
      {
        key: 'sub2-2',
        label: 'Add, Edit and Delete Property',
        value: 'Add, Edit and Delete Property',
      },
      {
        key: 'sub2-3',
        label: 'Create, Edit and Delete Connection',
        value: 'Create, Edit and Delete Connection',
      },
      {
        key: 'sub2-4',
        label: 'Add, Edit and Delete Connection Property',
        value: 'Add, Edit and Delete Connection Property',
      },
      {
        key: 'sub2-5',
        label: 'Search In Schema',
        value: 'Search In Schema',
      },
    ],
  },
  {
    value: 'Data sheet section',
    label: 'Data sheet section',
    key: 'sub3',
    children: [
      {
        key: 'sub3-1',
        label: 'Create, Edit and Delete Type',
        value: 'Create, Edit and Delete Type',
      },
      {
        key: 'sub3-2',
        label: 'Add, Edit and Delete Property',
        value: 'Add, Edit and Delete Property',
      },
      {
        key: 'sub3-3',
        label: 'Create, Edit and Delete Connection',
        value: 'Create, Edit and Delete Connection',
      },
      {
        key: 'sub3-4',
        label: 'Add, Edit and Delete Connection Property',
        value: 'Add, Edit and Delete Connection Property',
      },
      {
        key: 'sub3-5',
        label: 'Search In Schema',
        value: 'Search In Schema',
      },
      {
        key: 'sub3-6',
        label: 'All data',
        value: 'All data',
      },
      {
        key: 'sub3-7',
        label: 'Add, Edit and Delete Node',
        value: 'Add, Edit and Delete Node',
      },
    ],
  },
  {
    label: 'Visualization',
    value: 'Visualization',
    key: 'sub5',
    children: [
      {
        key: 'sub5-1',
        label: 'Add, Edit and Delete Node',
        value: 'Add, Edit and Delete Node',
      },
      {
        key: 'sub5-2',
        label: 'Filters',
        value: 'Filters',
      },
      {
        key: 'sub5-3',
        label: 'Queries',
        value: 'Queries',
      },
      {
        key: 'sub5-4',
        label: 'Styling',
        value: 'Styling',
      },
      {
        key: 'sub5-5',
        label: 'Focus, Expand, Shortest path',
        value: 'Focus, Expand, Shortest path',
      },
    ],
  },
  {
    label: 'Perspective',
    value: 'Perspective',
    key: 'sub6',
  },
];

export const Help: React.FC = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [activeMenuItem, setActiveMenuItem] = useState('sub1-1');
  const handleMenuItemClick = (key: SetStateAction<string>) => {
    setActiveMenuItem(key === activeMenuItem ? '' : key);
  };
  return (
    <Space>
      <Row gutter={16}>
        <Helpicon onClick={showDrawer} style={{ cursor: 'pointer' }} />
        <Col span={24}>
          <Drawer width={'55%'} closable={false} onClose={onClose} visible={open}>
            <Row gutter={16}>
              <Col span={10}>
                <h3 style={{ margin: '0' }}>Help</h3>
              </Col>
              <Col span={14}>
                <TreeSelect
                  style={{ width: '100%' }}
                  showSearch
                  placeholder="Search"
                  allowClear
                  treeDefaultExpandAll
                  treeData={items}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={10} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
                <Menu
                  onClick={({ key }) => handleMenuItemClick(key)}
                  defaultOpenKeys={['sub1', 'sub1-1']}
                  defaultSelectedKeys={['sub1', 'sub1-1']}
                  mode="inline"
                  items={items}
                />
              </Col>
              <Col span={14} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
                <ProjectsFolders activeMenuItem={activeMenuItem} />
                <OverviewSection activeMenuItem={activeMenuItem} />
                <SchemaSection activeMenuItem={activeMenuItem} />
                <DataSheetSection activeMenuItem={activeMenuItem} />
                <VisualizationSection activeMenuItem={activeMenuItem} />
                <Perspective activeMenuItem={activeMenuItem} />
              </Col>
            </Row>
          </Drawer>
        </Col>
      </Row>
    </Space>
  );
};
