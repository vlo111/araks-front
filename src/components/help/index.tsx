import React, { useState } from 'react';
import { Col, Drawer, Input, Menu, Row, Space, Typography } from 'antd';
import { ReactComponent as Helpicon } from 'components/help/images/help.svg';
import { ProjectsFolders } from './projects-and-folders';
import { OverviewSection } from './overview';
import { SchemaSection } from './schema-section';
import { DataSheetSection } from './data-sheet';
import { VisualizationSection } from './visualization';
import { Perspective } from './perspective';
import { SearchOutlined } from '@ant-design/icons';

const items = [
  {
    label: 'Projects and Folders',
    subMenuKey: 'sub1',
    items: [
      { label: 'Create, Edit and Delete the Project', subMenuKey: 'sub1-1' },
      { label: 'Create, Edit and Delete the Folder', subMenuKey: 'sub1-2' },
    ],
  },
  {
    label: 'Overview',
    subMenuKey: 'sub4',
    items: [
      { label: 'Project name and Privacy', subMenuKey: 'sub4-1' },
      { label: 'See all members', subMenuKey: 'sub4-2' },
      { label: 'Comments and Likes', subMenuKey: 'sub4-3' },
    ],
  },
  {
    label: 'Schema section',
    subMenuKey: 'sub2',
    items: [
      { label: 'Create, Edit and Delete Type', subMenuKey: 'sub2-1' },
      { label: 'Add, Edit and Delete Property', subMenuKey: 'sub2-2' },
      { label: 'Create, Edit and Delete Connection', subMenuKey: 'sub2-3' },
      { label: 'Add, Edit and Delete Connection Property', subMenuKey: 'sub2-4' },
      { label: 'Search In Schema', subMenuKey: 'sub2-5' },
    ],
  },
  {
    label: 'Data sheet section',
    subMenuKey: 'sub3',
    items: [
      { label: 'Create, Edit and Delete Type', subMenuKey: 'sub3-1' },
      { label: 'Add, Edit and Delete Property', subMenuKey: 'sub3-2' },
      { label: 'Add, Edit and Delete Node', subMenuKey: 'sub3-7' },
      { label: 'Create, Edit and Delete Connection', subMenuKey: 'sub3-3' },
      { label: 'Add, Edit and Delete Connection Property', subMenuKey: 'sub3-4' },
      { label: 'Add, Edit and Delete Node in Connection', subMenuKey: 'sub3-5' },
      { label: 'All data', subMenuKey: 'sub3-6' },
    ],
  },
  {
    label: 'Visualization',
    subMenuKey: 'sub5',
    items: [
      { label: 'Add, Edit and Delete Node', subMenuKey: 'sub5-1' },
      { label: 'Filters', subMenuKey: 'sub5-2' },
      { label: 'Queries', subMenuKey: 'sub5-3' },
      { label: 'Styling', subMenuKey: 'sub5-4' },
      { label: 'Focus, Expand, Shortest path', subMenuKey: 'sub5-5' },
    ],
  },
  {
    label: 'Perspective',
    subMenuKey: 'sub6',
  },
];

export const Help: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('sub1-1');
  const [search, setSearch] = useState<string>('');
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const filteredItems = items.filter((item) => {
    const labelMatches = item.label.toLowerCase().includes(search.toLowerCase());
    if (labelMatches) {
      return true;
    } else {
      if (item.items) {
        return item.items.some((subItem) => subItem.label.toLowerCase().includes(search.toLowerCase()));
      }
    }
    return false;
  });

  const handleMenuItemClick = (key: string) => {
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
                <Typography.Title level={2} style={{ margin: 0 }}>
                  Help
                </Typography.Title>
              </Col>
              <Col span={14}>
                <Input
                  prefix={<SearchOutlined style={{ fontSize: '18px' }} />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={10} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
                <Menu
                  onClick={({ key }) => handleMenuItemClick(key)}
                  defaultOpenKeys={['sub1', 'sub1-1']}
                  defaultSelectedKeys={[activeMenuItem]}
                  mode="inline"
                >
                  {filteredItems.map((item) => (
                    <Menu.SubMenu key={item.subMenuKey} title={item.label}>
                      {item.items &&
                        item.items.map((subItem) => <Menu.Item key={subItem.subMenuKey}>{subItem.label}</Menu.Item>)}
                    </Menu.SubMenu>
                  ))}
                </Menu>
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
