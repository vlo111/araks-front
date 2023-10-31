import React, { useState } from 'react';
import { Col, Drawer, Input, Menu, Row, Space, Typography } from 'antd';
import { ReactComponent as Helpicon } from 'components/help/help.svg';
import { ProjectsFolders } from './projects-and-folders';
import { OverviewSection } from './overview';
import { SchemaSection } from './schema-section';
import { DataSheetSection } from './data-sheet';
import { VisualizationSection } from './visualization';
import { Perspective } from './perspective';
import { SearchOutlined } from '@ant-design/icons';
const { Text } = Typography;
const items = [
  {
    label: <span style={{ fontWeight: '700', fontSize: '18px' }}>Projects and Folders</span>,
    subMenuKey: 'sub1',
    items: [
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Create, Edit and Delete the Project</span>,
        subMenuKey: 'sub1-1',
      },
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Create, Edit and Delete the Folder</span>,
        subMenuKey: 'sub1-2',
      },
    ],
  },
  {
    label: <span style={{ fontWeight: '700', fontSize: '18px' }}>Overview</span>,
    subMenuKey: 'sub4',
    items: [
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Project name and Privacy</span>,
        subMenuKey: 'sub4-1',
      },
      { label: <span style={{ fontWeight: '600', fontSize: '16px' }}>See all members</span>, subMenuKey: 'sub4-2' },
      { label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Comments and Likes</span>, subMenuKey: 'sub4-3' },
    ],
  },
  {
    label: <span style={{ fontWeight: '700', fontSize: '18px' }}>Schema section</span>,
    subMenuKey: 'sub2',
    items: [
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Create, Edit and Delete Type</span>,
        subMenuKey: 'sub2-1',
      },
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Add, Edit and Delete Property</span>,
        subMenuKey: 'sub2-2',
      },
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Create, Edit and Delete Connection</span>,
        subMenuKey: 'sub2-3',
      },
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Add, Edit and Delete Connection Property</span>,
        subMenuKey: 'sub2-4',
      },
      { label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Search In Schema</span>, subMenuKey: 'sub2-5' },
    ],
  },
  {
    label: <span style={{ fontWeight: '700', fontSize: '18px' }}>Data sheet section</span>,
    subMenuKey: 'sub3',
    items: [
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Create, Edit and Delete Type</span>,
        subMenuKey: 'sub3-1',
      },
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Add, Edit and Delete Property</span>,
        subMenuKey: 'sub3-2',
      },
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Add, Edit and Delete Node</span>,
        subMenuKey: 'sub3-7',
      },
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Create, Edit and Delete Connection</span>,
        subMenuKey: 'sub3-3',
      },
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Add, Edit and Delete Connection Property</span>,
        subMenuKey: 'sub3-4',
      },
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Add, Edit and Delete Node in Connection</span>,
        subMenuKey: 'sub3-5',
      },
      { label: <span style={{ fontWeight: '600', fontSize: '16px' }}>All data</span>, subMenuKey: 'sub3-6' },
    ],
  },
  {
    label: <span style={{ fontWeight: '700', fontSize: '18px' }}>Visualization</span>,
    subMenuKey: 'sub5',
    items: [
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Add, Edit and Delete Node</span>,
        subMenuKey: 'sub5-1',
      },
      { label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Filters</span>, subMenuKey: 'sub5-2' },
      { label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Queries</span>, subMenuKey: 'sub5-3' },
      { label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Styling</span>, subMenuKey: 'sub5-4' },
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Focus, Expand, Shortest path</span>,
        subMenuKey: 'sub5-5',
      },
    ],
  },
  {
    label: <span style={{ fontWeight: '700', fontSize: '18px' }}>Perspective</span>,
    items: [
      {
        label: <span style={{ fontWeight: '600', fontSize: '16px' }}>Add, Edit and Delete Perspective</span>,
        subMenuKey: 'sub6-1',
      },
    ],
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
  const filteredItems = items
    .map((item) => {
      const itemLabel = typeof item.label === 'string' ? item.label : item.label.props.children;
      const filteredSubItems = item.items
        ? item.items.filter((subItem) => {
            const subItemLabel = typeof subItem.label === 'string' ? subItem.label : subItem.label.props.children;

            return subItemLabel.toLowerCase().includes(search.toLowerCase());
          })
        : [];
      if (filteredSubItems.length > 0 || itemLabel.toLowerCase().includes(search.toLowerCase())) {
        return {
          ...item,
          items: filteredSubItems,
        };
      }
      return null;
    })
    .filter(Boolean);
  const [isSearching, setIsSearching] = useState(false);
  const handleMenuItemClick = (key: string) => {
    if (key !== activeMenuItem) {
      setActiveMenuItem(key);
    }
  };
  return (
    <Space>
      <Helpicon onClick={showDrawer} style={{ cursor: 'pointer' }} />
      <Drawer width={'55%'} closable={false} onClose={onClose} visible={open}>
        <Row gutter={[8, 8]}>
          <Col span={8} style={{ padding: 0 }}>
            <Row style={{ marginBottom: '15px' }}>
              <Col span={5}>
                <Text strong style={{ margin: 0, color: '#232F6A' }}>
                  Help
                </Text>
              </Col>
              <Col span={18}>
                <Input
                  prefix={<SearchOutlined style={{ fontSize: '18px', color: '#C3C3C3' }} />}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setIsSearching(e.target.value.length >= 2);
                  }}
                  placeholder="Search"
                  style={{ height: '25px', borderColor: '#C3C3C3', fontSize: '15px' }}
                />
              </Col>
            </Row>
            <Menu
              onClick={({ key }) => handleMenuItemClick(key)}
              defaultOpenKeys={['sub1', 'sub1-1']}
              defaultSelectedKeys={[activeMenuItem]}
              mode="inline"
              style={{
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 64px)',
              }}
            >
              {filteredItems.map(
                (item) =>
                  item && (
                    <Menu.SubMenu key={item.subMenuKey} title={item.label}>
                      {item.items.map((subItem) => (
                        <Menu.Item
                          onClick={({ key }) => handleMenuItemClick(key)}
                          key={subItem.subMenuKey}
                          style={{ background: isSearching ? '#EDE06D' : '' }}
                        >
                          {subItem.label}
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  )
              )}
            </Menu>
          </Col>
          <Col
            span={16}
            style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: 'calc(100vh - 64px)', padding: 0 }}
          >
            <ProjectsFolders activeMenuItem={activeMenuItem} />
            <OverviewSection activeMenuItem={activeMenuItem} />
            <SchemaSection activeMenuItem={activeMenuItem} />
            <DataSheetSection activeMenuItem={activeMenuItem} />
            <VisualizationSection activeMenuItem={activeMenuItem} />
            <Perspective activeMenuItem={activeMenuItem} />
          </Col>
        </Row>
      </Drawer>
    </Space>
  );
};
