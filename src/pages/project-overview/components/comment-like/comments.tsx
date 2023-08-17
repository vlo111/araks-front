import { Button, Form, Skeleton } from 'antd';
import { useGetComments } from 'api/comments/use-get-comments';
import { useManageComment } from 'api/comments/use-manage-comment';
import { ProjectCommentManage } from 'api/types';
import { FormItem } from 'components/form/form-item';
import { Title } from 'components/typography';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';

// Define custom toolbar options with only bold, italic, and underline styles
const toolbarOptions = [['bold', 'italic', 'underline']];

// Customize the formats allowed in the editor to only include bold, italic, and underline styles
const formats = ['bold', 'italic', 'underline'];

// Override the default module with the customized toolbar and formats
const modules = {
  toolbar: toolbarOptions,
};

export const Comments = () => {
  const params = useParams();

  const [form] = Form.useForm();
  const { data, isLoading } = useGetComments(params.id, { enabled: !!params.id });
  const { mutate } = useManageComment();
  const onFinish = (values: ProjectCommentManage) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
    mutate({ ...values, project_id: params.id });
  };

  // eslint-disable-next-line no-console
  console.log('data', data);

  return (
    <Form
      name="comment-form"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      style={{ height: '100%' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        {isLoading ? (
          <Skeleton avatar paragraph={{ rows: 4 }} />
        ) : data.length ? (
          <></>
        ) : (
          <Title level={1} color={COLORS.PRIMARY.GRAY_DARK} align="center">
            No comments yet
          </Title>
        )}
        <div>
          <FormItem name="comment" rules={[{ required: true, message: VALIDATE_MESSAGES.required }]}>
            <ReactQuill modules={modules} formats={formats} />
          </FormItem>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};
