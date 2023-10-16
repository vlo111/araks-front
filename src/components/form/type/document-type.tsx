import { PaperClipOutlined } from '@ant-design/icons';
import { Form, message, Space, Upload } from 'antd';
import { ProjectTypePropertyReturnData } from 'api/types';
import { FILE_UPLOAD_URL } from 'api/upload/constants';
import { Button } from 'components/button';
import { AddNewFieldButton } from 'components/button/add-new-field-button';
import { SecondaryText, Text } from 'components/typography';
import { AUTH_KEYS, COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import { useLocalStorageGet } from 'hooks/use-local-storage-get';
import styled from 'styled-components';
import { FormItem } from '../form-item';
import { SetStateAction, Dispatch } from 'react';

type Props = {
  data: ProjectTypePropertyReturnData;
  setStopSubmit?: Dispatch<SetStateAction<boolean>>;
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

const fileTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];
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

export const DocumentType = ({ data, setStopSubmit }: Props) => {
  const token = useLocalStorageGet<string>(AUTH_KEYS.TOKEN, '');

  const docsUploaded = Form.useWatch(data.name);

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
          action={`${process.env.REACT_APP_BASE_URL}${FILE_UPLOAD_URL}`}
          name="file"
          multiple={data.multiple_type}
          headers={{
            Authorization: `Bearer ${token}`,
            accept: 'document',
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

            if (status === 'uploading') {
              setStopSubmit?.(true);
            }
            if (status === 'done') {
              setStopSubmit?.(false);
            } else if (status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
              setStopSubmit?.(false);
            }
          }}
        >
          <StyledButton
            block
            icon={<PaperClipOutlined />}
            disabled={docsUploaded && docsUploaded.length === maxAllowedFilesCount}
          >
            Upload File
          </StyledButton>
          {data.multiple_type === true &&
            (!docsUploaded || (docsUploaded && docsUploaded.length < maxAllowedFilesCount)) && <AddNewFieldButton />}
        </StyledUpload>
      </FormItem>
    </div>
  );
};
