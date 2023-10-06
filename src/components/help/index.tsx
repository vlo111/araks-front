import { SetStateAction, useState } from 'react';
import type { MenuProps } from 'antd';
import { Col, Drawer, Menu, Row, Space } from 'antd';
import { ReactComponent as Helpicon } from 'components/help/images/help.svg';
import { ProjectsFolders } from './projects-and-folders';
import { OverviewSection } from './overview';
import { SchemaSection } from './schema-section';
import { DataSheetSection } from './data-sheet';
import { VisualizationSection } from './visualization';
import { Perspective } from './perspective';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, children?: MenuItem[], type?: 'group'): MenuItem {
  return {
    key,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem(<span style={{ fontWeight: '800', fontSize: '18px' }}>Projects and Folders</span>, 'sub1', [
    getItem(<span style={{ fontSize: '16px' }}>Create, Edit and Delete the Project</span>, 'sub1-1'),
    getItem(<span style={{ fontSize: '16px' }}>Create, Edit and Delete the Folder</span>, 'sub1-2'),
  ]),
  getItem(<span style={{ fontWeight: '800', fontSize: '18px' }}>Overview</span>, 'sub4', [
    getItem(<span style={{ fontSize: '16px' }}>Project name and Privacy</span>, 'sub4-1'),
    getItem(<span style={{ fontSize: '16px' }}>See all members </span>, 'sub4-2'),
    getItem(<span style={{ fontSize: '16px' }}>Comments and Likes</span>, 'sub4-3'),
  ]),

  getItem(<span style={{ fontWeight: '700', fontSize: '18px' }}>Schema section</span>, 'sub2', [
    getItem(<span style={{ fontSize: '16px' }}>Create, Edit and Delete Type</span>, 'sub2-1'),
    getItem(<span style={{ fontSize: '16px' }}>Add, Edit and Delete Property</span>, 'sub2-2'),
    getItem(<span style={{ fontSize: '16px' }}>Create, Edit and Delete Connection</span>, 'sub2-3'),
    getItem(<span style={{ fontSize: '16px' }}>Add, Edit and Delete Connection Property</span>, 'sub2-4'),
    getItem(<span style={{ fontSize: '16px' }}>Search In Schema</span>, 'sub2-5'),
  ]),
  getItem(<span style={{ fontWeight: '700', fontSize: '18px' }}>Data sheet section</span>, 'sub3', [
    getItem(<span style={{ fontSize: '16px' }}>Create, Edit and Delete Type</span>, 'sub3-1'),
    getItem(<span style={{ fontSize: '16px' }}>Add, Edit and Delete Property</span>, 'sub3-2'),
    getItem(<span style={{ fontSize: '16px' }}>Add, Edit and Delete Node</span>, 'sub3-7'),
    getItem(<span style={{ fontSize: '16px' }}>Create, Edit and Delete Connection</span>, 'sub3-3'),
    getItem(<span style={{ fontSize: '16px' }}>Add, Edit and Delete Connection Property</span>, 'sub3-4'),
    getItem(<span style={{ fontSize: '16px' }}>Add, Edit and Delete Node in Connection</span>, 'sub3-5'),
    getItem(<span style={{ fontSize: '16px' }}>All data</span>, 'sub3-6'),
  ]),
  getItem(<span style={{ fontWeight: '800', fontSize: '18px' }}>Visualization</span>, 'sub5', [
    getItem(<span style={{ fontSize: '16px' }}>Add, Edit and Delete Node</span>, 'sub5-1'),
    getItem(<span style={{ fontSize: '16px' }}>Filters </span>, 'sub5-2'),
    getItem(<span style={{ fontSize: '16px' }}>Queries</span>, 'sub5-3'),
    getItem(<span style={{ fontSize: '16px' }}>Styling</span>, 'sub5-4'),
    getItem(<span style={{ fontSize: '16px' }}>Focus, Expand, Shortest path</span>, 'sub5-5'),
  ]),
  getItem(<span style={{ fontWeight: '800', fontSize: '18px' }}>Perspective</span>, 'sub6'),
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
          <Drawer title="Help" width={'55%'} closable={false} onClose={onClose} visible={open}>
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
