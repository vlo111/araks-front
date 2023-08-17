import { Button, Form } from 'antd';
import { useGetComments } from 'api/comments/use-get-comments';
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
  const { data } = useGetComments({ project_id: params.id || '' }, { enabled: !!params.id });
  const onFinish = (values: string) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
  };

  // eslint-disable-next-line no-console
  console.log('data', data);

  return (
    <Form name="comment-form" form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Title level={1} color={COLORS.PRIMARY.GRAY_DARK} align="center">
          No comments yet
        </Title>
        <FormItem name="comment" rules={[{ required: true, message: VALIDATE_MESSAGES.required }]}>
          <ReactQuill modules={modules} formats={formats} />
        </FormItem>
        <Button block type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};
