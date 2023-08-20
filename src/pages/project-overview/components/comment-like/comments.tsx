import { Button, Form } from 'antd';
import { useManageComment } from 'api/comments/use-manage-comment';
import { ProjectCommentManage } from 'api/types';
import { FormItem } from 'components/form/form-item';
import { VALIDATE_MESSAGES } from 'helpers/constants';
import { useParams } from 'react-router-dom';
import { CommentData } from './comment-data';
import { ReplayText } from './replay-text';

import 'react-quill/dist/quill.snow.css';
import 'quill-mention';
import { CommentInput } from './comment-input';

export const Comments = () => {
  const params = useParams();

  const [form] = Form.useForm();

  const { mutate } = useManageComment();
  const onFinish = (values: ProjectCommentManage) => {
    mutate({ ...values, project_id: params.id, parent_id: form.getFieldValue('parent_id') || null });
    form.resetFields();
  };

  return (
    <Form
      name="comment-form"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      style={{ height: '100%' }}
      initialValues={{ parent_id: null }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <CommentData />
        <div>
          <ReplayText />
          <FormItem name="comments" rules={[{ required: true, message: VALIDATE_MESSAGES.required }]}>
            <CommentInput />
          </FormItem>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};
