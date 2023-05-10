import { PaperClipOutlined } from '@ant-design/icons';
import { Space, Upload } from 'antd';
import { ProjectTypePropertyReturnData } from 'api/types';
import { Button } from 'components/button';
import { SecondaryText, Text } from 'components/typography';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import styled from 'styled-components';
import { FormItem } from '../form-item';

type Props = {
  data: ProjectTypePropertyReturnData;
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

export const DocumentType = ({ data }: Props) => {
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
      >
        <StyledUpload>
          <StyledButton block icon={<PaperClipOutlined />}>
            Upload File
          </StyledButton>
        </StyledUpload>
      </FormItem>
    </div>
  );
};
