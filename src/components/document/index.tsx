import { Input as InputComponent, Upload as UploadComponent } from 'antd';
import styled from 'styled-components';
import { PaperClipOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd/es/upload/interface';

const suffix = <PaperClipOutlined />;

const Input = styled((props) => <InputComponent {...props} suffix={suffix} />)``;

const uploadDefaultProps: UploadProps = {
  children: <Input value="Upload file" />,
  listType: 'picture',
};

export const Document = styled((props: UploadProps) => <UploadComponent {...props} {...uploadDefaultProps} />)`
  .ant-upload-select {
    display: block;
  }
`;
