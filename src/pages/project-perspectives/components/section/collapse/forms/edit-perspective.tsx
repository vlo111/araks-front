import { Form, Space, Spin, Tooltip } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { FormInput, TextArea } from 'components/input';
import { Text } from 'components/typography';
import { FormItem } from 'components/form/form-item';
import { Button } from 'components/button';
import { VerticalSpace } from 'components/space/vertical-space';
import { useCreatePerspective } from 'api/perspective/use-create-perspective';
import { FC } from 'react';
import { useGetPerspective } from 'api/perspective/use-get-perspective';

type PerspectiveFormValues = {
  title: string;
  description: string;
};

type Props = FC<{ id: string | undefined; onCancel: VoidFunction }>;

const Wrapper = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

export const AddForm: Props = ({ onCancel, id }) => {
  const [form] = Form.useForm();

  const { mutate: createPerspective } = useCreatePerspective({}, id);

  const { isInitialLoading } = useGetPerspective(id as string, {
    enabled: !!id,
    onSuccess: (data) => {
      form.setFieldsValue({ ...data });
    },
  });

  const onFinish = (values: PerspectiveFormValues) => {
    createPerspective(values);
    onCancel();
  };

  return (
    <Wrapper>
      <Spin spinning={isInitialLoading}>
        <Form
          name="perspective-form"
          form={form}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
        >
          <Space size={8}>
            <Text>{id ? 'Edit Perspective' : 'Add Perspective'}</Text>
            <Tooltip title="Useful information" placement="right">
              <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
            </Tooltip>
          </Space>
          <FormItem
            name="title"
            label="Name"
            rules={[
              { required: true, message: 'Node type name is required' },
              { min: 3, message: 'The minimum length for this field is 3 characters' },
              { max: 30, message: 'The maximum length for this field is 30 characters' },
            ]}
          >
            <FormInput placeholder="Write title" />
          </FormItem>

          <FormItem
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Node type name is required' },
              { min: 1, message: 'The minimum length for this field is 3 characters' },
              { max: 250, message: 'The maximum length for this field is 30 characters' },
            ]}
          >
            <TextArea rows={4} maxLength={250} placeholder="Write description" />
          </FormItem>
          <FormItem>
            <VerticalSpace>
              <Button block type="primary" htmlType="submit">
                Save
              </Button>
              <Button block type="text" onClick={onCancel}>
                Cancel
              </Button>
            </VerticalSpace>
          </FormItem>
        </Form>
      </Spin>
    </Wrapper>
  );
};
