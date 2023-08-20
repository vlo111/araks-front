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
import { MentionRowsValue } from 'api/user/types';
import { useGetUserSearch } from 'api/user/use-get-user-search';
import { useMemo } from 'react';
import ReactQuill from 'react-quill';

const formats = ['bold', 'italic', 'underline', 'mention'];

// Define custom toolbar options with only bold, italic, and underline styles
const toolbarOptions = [['bold', 'italic', 'underline']];

// Customize the formats allowed in the editor to only include bold, italic, and underline styles

type SourceRenderList = (matches: MentionRowsValue[], searchForm?: string) => void;

export const Comments = () => {
  const params = useParams();

  const [form] = Form.useForm();
  const { mutateAsync } = useGetUserSearch();

  const modules = useMemo(
    () => ({
      toolbar: toolbarOptions,
      mention: {
        allowedChars: /^[A-Za-z\s]*$/,
        positioningStrategy: 'fixed',
        mentionDenotationChars: ['@'],
        minChars: 3,
        renderLoading: () => {
          return '';
        },
        source: async function (searchTerm: string, renderList: SourceRenderList) {
          const { data } = await mutateAsync({ search: searchTerm });
          const renderData = await data.rows.map((item) => ({
            id: item.id,
            value: `${item.first_name} ${item.last_name}`,
          }));
          await renderList(renderData);
        },
      },
    }),
    [mutateAsync]
  );

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
