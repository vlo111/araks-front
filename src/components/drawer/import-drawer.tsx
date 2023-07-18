import { Drawer, message, Modal, Space, Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { FILE_IMPORT_URL } from 'api/upload/constants';
import { Button } from 'components/button';
import { ImportCancelButton } from 'components/button/import-cancel-button';
import { Icon } from 'components/icon';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
// import { Modal } from 'components/modal';
import { ImportActionType, useImport } from 'context/import-context';
import { AUTH_KEYS, COLORS } from 'helpers/constants';

const { Dragger } = Upload;

const allowedFileTypes = ['csv', 'xlsx'];
const fileExtensionsToString = allowedFileTypes.join(', ');
const token = localStorage.getItem(AUTH_KEYS.TOKEN) || '';

const handleFileUpload = (file: RcFile): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    // Extract the file extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    // eslint-disable-next-line no-console
    // console.log('Cheeeeeck', allowedFileTypes.includes(fileExtension || ''), fileExtension);
    // Check if the file extension is valid
    if (!allowedFileTypes.includes(fileExtension || '')) {
      message.error(`Invalid file type. Only ${fileExtensionsToString} files are allowed.`);
      resolve(false);
      return;
    }

    // Proceed with file processing
    // ... (your logic here)

    resolve(true);
  });
};

const props: UploadProps = {
  name: 'file',
  multiple: false,
  showUploadList: false,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  accept: fileExtensionsToString,

  onDrop(e) {
    // eslint-disable-next-line no-console
    // console.log('Dropped files', e.dataTransfer.files);
  },
};

export const ImportDrawer = () => {
  const { state, dispatch } = useImport();

  const handleCancel = () => {
    dispatch({ type: ImportActionType.IMPORT_CLOSE, payload: {} });
  };

  return (
    <>
      <Modal
        open={state.importConfirm}
        title={<Text color={COLORS.SECONDARY.GREEN}>Success</Text>}
        getContainer={false}
        destroyOnClose
        closable={false}
        mask
        maskStyle={{ backgroundImage: 'linear-gradient(#C8CBDA80, #FFFFFF7D)', backdropFilter: 'blur(5px)' }}
        footer={null}
      >
        <VerticalSpace>
          <Space>
            <Icon color="#414141" icon="file" size={40} />
            <Text>{state.fileName}</Text>
          </Space>
          <Button
            block
            type="primary"
            onClick={() => dispatch({ type: ImportActionType.IMPORT_SUCCESS_NEXT, payload: {} })}
          >
            Next
          </Button>
          <ImportCancelButton name="Back" type={ImportActionType.IMPORT_SUCCESS_BACK} />
        </VerticalSpace>
      </Modal>
      <Drawer
        open={state.importOpen}
        footer={false}
        placement="top"
        closable={false}
        className="project-modal"
        onClose={handleCancel}
        getContainer={false}
        destroyOnClose
        // afterOpenChange={(open) => {
        //   if (!open) {
        //     handleCancel();
        //   }
        // }}
        contentWrapperStyle={{
          margin: '10% 30%',
          boxShadow: 'none',
        }}
        style={{
          background: 'transparent',
        }}
        maskStyle={{ backgroundImage: 'linear-gradient(#C8CBDA80, #FFFFFF7D)', backdropFilter: 'blur(5px)' }}
      >
        <Dragger
          {...props}
          beforeUpload={handleFileUpload}
          action={`${process.env.REACT_APP_BASE_URL}${FILE_IMPORT_URL}`}
          onChange={(info) => {
            const { status } = info.file;
            if (status !== 'uploading') {
              // eslint-disable-next-line no-console
              // console.log(info.file, info.fileList);
            }
            if (status === 'done') {
              // eslint-disable-next-line no-console
              // console.log('info.file done', info.file);
              dispatch({
                type: ImportActionType.IMPORT_SUCCESS_CONFIRM,
                payload: {
                  fileName: info.file.name,
                  ...info.file.response,
                },
              });
              // message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
              // message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <VerticalSpace>
            <Icon color="#414141" icon="import-file" size={151} />
            <Text color={COLORS.PRIMARY.GRAY}>Import other Xls or CSV file</Text>
            <Text color={COLORS.PRIMARY.BLUE} underline>
              Browse on your device
            </Text>
          </VerticalSpace>
        </Dragger>
      </Drawer>
    </>
  );
};
