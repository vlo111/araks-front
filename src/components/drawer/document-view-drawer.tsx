import { Drawer } from 'antd';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Text } from 'components/typography';
import { UploadedFileType } from 'types/node';
import { useState } from 'react';
import { DocumentView } from 'components/document-view';

type Props = {
  node: UploadedFileType;
};

export const DocumentViewDrawer = ({ node }: Props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Button
        type="link"
        icon={<Icon icon="file1" size={20} color="red" />}
        key={(node as UploadedFileType).url}
        onClick={() => {
          setOpenDrawer(true);
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
      <Drawer
        open={openDrawer}
        closable={false}
        destroyOnClose
        width={600}
        getContainer={false}
        placement="right"
        rootClassName="add-node-drawer"
        drawerStyle={{
          background: '#F2F2F2',
          boxShadow: '10px 10px 10px 0px rgba(111, 111, 111, 0.10) inset',
        }}
        contentWrapperStyle={{
          marginTop: (document.querySelector('.datasheet-view-drawer .ant-drawer-header')?.clientHeight || 0) - 20,
          boxShadow: 'none',
        }}
        style={{
          margin: '16px 16px 48px',
          background: 'transparent',
        }}
        mask={false}
      >
        <DocumentView node={node} />
      </Drawer>
    </>
  );
};
