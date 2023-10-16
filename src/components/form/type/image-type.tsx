import { PaperClipOutlined } from '@ant-design/icons';
import { Form, message, Space, Upload } from 'antd';
import { ProjectTypePropertyReturnData } from 'api/types';
import { IMAGE_UPLOAD_URL } from 'api/upload/constants';
import { Button } from 'components/button';
import { AddNewFieldButton } from 'components/button/add-new-field-button';
import { SecondaryText, Text } from 'components/typography';
import { AUTH_KEYS, COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import { useLocalStorageGet } from 'hooks/use-local-storage-get';
import styled from 'styled-components';
import { FormItem } from '../form-item';

type Props = {
  data: ProjectTypePropertyReturnData;
  nodeId?: string;
};

const StyledButton = styled(Button)`
  background: linear-gradient(91.78deg, rgba(255, 255, 255, 0.64) 6.81%, rgba(255, 255, 255, 0.16) 100%);
  border: 1px solid ${COLORS.PRIMARY.GRAY};
  border-radius: 4px;
  text-align: left;
`;

const StyledUpload = styled(Upload)`
  .ant-upload {
    display: block;
  }
`;

const fileTypes = ['.jpg', '.jpeg', '.png', '.psd', '.tiff', '.webp', '.svg'];
const allowedTypes = fileTypes.join(',');
const maxSize = 10; // in MB
const maxAllowedFilesCount = 5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const ImageType = ({ nodeId, data }: Props) => {
  const token = useLocalStorageGet<string>(AUTH_KEYS.TOKEN, '');
  const imagesUploaded = Form.useWatch(data.name);

  const label = (
    <Space>
      <Text color={COLORS.PRIMARY.BLUE}>{`${data.name}`}</Text>
      <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${data.ref_property_type_id})`}</SecondaryText>
    </Space>
  );

  return (
    <div style={{ textAlign: 'left' }}>
      <FormItem
        key={data.id}
        name={data.name}
        label={label}
        rules={[{ required: data.required_type, message: VALIDATE_MESSAGES.required }]}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <StyledUpload
          data={{
            property_id: data.id,
            project_id: data.project_id,
            project_node_type_id: data.project_type_id,
            node_id: nodeId,
          }}
          action={`${process.env.REACT_APP_BASE_URL}${IMAGE_UPLOAD_URL}`}
          name="file"
          multiple={data.multiple_type}
          headers={{
            Authorization: `Bearer ${token}`,
          }}
          maxCount={data.multiple_type ? maxAllowedFilesCount : 1}
          beforeUpload={(file) => {
            const isFileTypeAllowed = fileTypes.some((type) => file.name.toLowerCase().endsWith(type));
            const isFileSizeAllowed = file.size / 1024 / 1024 < maxSize;
            if (!isFileTypeAllowed) {
              message.error(`allowed only the following file types: ${allowedTypes}.`);
            }
            if (!isFileSizeAllowed) {
              message.error(`Not allowed files more than ${maxSize}MB`);
            }
            return (isFileTypeAllowed && isFileSizeAllowed) || Upload.LIST_IGNORE;
          }}
          onChange={(info) => {
            const { status } = info.file;

            if (status !== 'uploading') {
            }
            if (status === 'done') {
              // message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <StyledButton
            block
            icon={<PaperClipOutlined />}
            disabled={imagesUploaded && imagesUploaded.length === maxAllowedFilesCount}
          >
            Upload File
          </StyledButton>
          {data.multiple_type === true &&
            (!imagesUploaded || (imagesUploaded && imagesUploaded.length < maxAllowedFilesCount)) && (
              <AddNewFieldButton />
            )}
        </StyledUpload>
      </FormItem>
    </div>
  );
};
