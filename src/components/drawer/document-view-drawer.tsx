import { Col, Drawer, Row } from 'antd';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Text } from 'components/typography';
import { NodeDataType, NodeDataTypes, UploadedFileType } from 'types/node';
import { useState } from 'react';
import { DocumentView } from 'components/document-view';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
  items?: NodeDataTypes;
};

export const DocumentViewDrawer = ({ items }: Props) => {
  const [openDrawer, setOpenDrawer] = useState<NodeDataType | undefined>();

  return (
    <>
      <Row gutter={[10, 10]}>
        {items?.map((node, index) => {
          return (
            <Col xs={12} xxl={6} key={index}>
              <Button
                key={index}
                type="link"
                icon={<Icon icon="file1" size={20} color="red" />}
                onClick={() => {
                  setOpenDrawer(node);
                }}
                style={{
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  borderRadius: '2.324px',
                  background: 'linear-gradient(137deg, rgba(246, 246, 246, 0.80) 0%, rgba(246, 246, 246, 0.20) 100%)',
                  boxShadow: '0px 2.32421875px 3.486328125px 0px rgba(111, 111, 111, 0.10)',
                }}
              >
                <Text style={{ maxWidth: '200px' }} ellipsis title={(node as UploadedFileType).name as string}>
                  {(node as UploadedFileType).name as string}
                </Text>
              </Button>
            </Col>
          );
        })}
      </Row>
      <Drawer
        open={!!openDrawer}
        closable={false}
        destroyOnClose
        width={600}
        getContainer={document.querySelector('.datasheet-view-drawer .ant-drawer-body') as HTMLElement}
        placement="right"
        drawerStyle={{
          background: '#F2F2F2',
          boxShadow: '10px 10px 10px 0px rgba(111, 111, 111, 0.10) inset',
        }}
        contentWrapperStyle={{
          marginTop: document.querySelector('.datasheet-view-drawer .ant-drawer-header')?.clientHeight || 0,
          boxShadow: 'none',
        }}
        style={{
          // margin: '16px 16px 48px',
          background: 'transparent',
        }}
        bodyStyle={{ padding: '32px 18px 18px' }}
        mask={false}
      >
        <div style={{ height: '100%', position: 'relative' }}>
          <CloseOutlined
            onClick={() => setOpenDrawer(undefined)}
            style={{ position: 'absolute', left: '-16px', top: '-26px' }}
          />
          {openDrawer && <DocumentView node={openDrawer as UploadedFileType} />}
        </div>
      </Drawer>
    </>
  );
};
