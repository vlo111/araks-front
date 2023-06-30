import { Col, Divider, Form, Row as RowComponent, Spin } from 'antd';
import { useGetProject } from 'api/projects/use-get-project';
import { Input as InputComponent, TextArea } from 'components/input';
import { VerticalSpace } from 'components/space/vertical-space';
import { FormItem } from 'components/form/form-item';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AddColorIcon } from './components/add-color-icon';
import { ProjectType } from './components/project-type';
import { Button } from 'components/button';
import { ManageProjectUrlProp, URL_CREAT_PROJECT, useManageProject } from 'api/projects/use-manage-project';
import { CreateOverviewFormData, RequestType, RequestTypes } from 'api/types';
import { ProjectUserInfo } from './components/project-user-info';
import { Text } from 'components/typography';
// import { logedInUser } from "helpers/utils";
import { useAuth } from 'context/auth-context';

const Row = styled(RowComponent)`
  &.overview {
    height: calc(100vh - 152px);

    .ant-col.overview__section {
      background: #f7f7f7;

      opacity: 0.2;
      box-shadow: -10px 0px 10px rgba(111, 111, 111, 0.1);

      &:first-child {
        opacity: 1;
        box-shadow: inset -10px 10px 10px rgba(111, 111, 111, 0.1);
      }

      &.project-save {
        padding: 32px 32px 40px;
      }
    }

    .overview-form-items {
      min-height: 80vh;
    }
  }
`;

const Input = styled(InputComponent)`
  border: none;
  border-bottom: 1px solid #95a2e1;
  border-radius: 0;
  background: transparent;
  font-family: 'Rajdhani';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.07em;
`;

type Props = {
  manageUrl?: ManageProjectUrlProp;
  type?: RequestType;
};

export const ProjectForm = ({ manageUrl = URL_CREAT_PROJECT, type = RequestTypes.Post }: Props) => {
  const params = useParams();
  const location = useLocation();

  const { user: logedInUser } = useAuth();
  const [form] = Form.useForm();

  const { mutate } = useManageProject(manageUrl, type);

  const onFinish = (values: CreateOverviewFormData) => {
    const defaultValues = {
      color: '#DBDBDB',
      icon: 'araks-small',
    };

    mutate({
      ...values,
      color: values.color ?? defaultValues.color,
      icon: values.icon ?? defaultValues.icon,
      folder_id: location.state.folderId,
    });
  };

  const handleCancel = () => {
    form.resetFields();
  };
  const { data, isInitialLoading } = useGetProject(
    { id: params.id },
    {
      enabled: !!params.id,
      onSuccess: (data) => {
        if (data.data) {
          form.setFieldsValue(data.data);
        }
      },
    }
  );

  const fullName =
    data && data.user
      ? `${data?.user.first_name} ${data?.user.last_name}`
      : `${logedInUser?.first_name} ${logedInUser?.last_name}`;

  return (
    <Spin spinning={isInitialLoading}>
      <Form
        name="overview-create"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
      >
        <VerticalSpace size={17} className="overview-form-items">
          <VerticalSpace size={42}>
            <div style={{ width: '100%', display: 'flex', gap: '22px' }}>
              <AddColorIcon />
              <VerticalSpace size={14}>
                <FormItem
                  name="title"
                  rules={[
                    { required: true, message: 'Title is required' },
                    { min: 3, message: 'The minimum length for this field is 3 characters' },
                  ]}
                  style={{ marginBottom: '0' }}
                >
                  <Input placeholder="Untitled" />
                </FormItem>
                <ProjectUserInfo createdAt={data?.created_at} updatedAt={data?.updated_at} userFullName={fullName} />
              </VerticalSpace>
            </div>
            <FormItem name="description" label="Description">
              <TextArea rows={4} />
            </FormItem>
          </VerticalSpace>
          <Divider style={{ margin: '0' }} />
          <Text>Privacy</Text>
          <ProjectType />
        </VerticalSpace>
        <Row align="bottom" justify="end" gutter={[32, 32]} style={{ alignSelf: 'end' }}>
          <Col span={3}>
            <Button type="text" onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
          <Col span={10} offset={2}>
            <Button block htmlType="submit" type="primary">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
