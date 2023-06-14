import { Space } from 'antd';
import ReactQuill from 'react-quill';
import { ProjectTypePropertyReturnData } from 'api/types';
import { SecondaryText, Text } from 'components/typography';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import { FormItem } from '../form-item';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';

type Props = {
  data: ProjectTypePropertyReturnData;
};

// Define custom toolbar options with only bold, italic, and underline styles
const toolbarOptions = [['bold', 'italic', 'underline']];

// Customize the formats allowed in the editor to only include bold, italic, and underline styles
const formats = ['bold', 'italic', 'underline'];

// Override the default module with the customized toolbar and formats
const modules = {
  toolbar: toolbarOptions,
};

export const RichTextType = ({ data }: Props) => {
  const label = (
    <Space>
      <Text color={COLORS.PRIMARY.BLUE}>{`${data.name}`}</Text>
      <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${data.ref_property_type_id})`}</SecondaryText>
    </Space>
  );

  const [value, setValue] = useState('');

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <FormItem
        key={data.id}
        name={[data.name, 0]}
        label={label}
        rules={[{ required: data.required_type, message: VALIDATE_MESSAGES.required }]}
      >
        <ReactQuill value={value} onChange={handleChange} modules={modules} formats={formats} />
      </FormItem>
    </div>
  );
};
