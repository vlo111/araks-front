/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form } from 'antd';
import { useManageComment } from 'api/comments/use-manage-comment';
import { ProjectCommentManage } from 'api/types';
import { FormItem } from 'components/form/form-item';
import { VALIDATE_MESSAGES } from 'helpers/constants';
import { useParams } from 'react-router-dom';
import { CommentDataShow } from './comment-data';
import { ReplayText } from './replay-text';
import { MentionRowsValue } from 'api/user/types';
import { useGetUserSearch } from 'api/user/use-get-user-search';
import { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import 'quill-mention';

const formats = ['bold', 'italic', 'underline', 'mention'];

// Define custom toolbar options with only bold, italic, and underline styles
const toolbarOptions = [['bold', 'italic', 'underline']];

// Customize the formats allowed in the editor to only include bold, italic, and underline styles

type SourceRenderList = (matches: MentionRowsValue[], searchForm?: string) => void;

// Function to extract mentions from Delta
const extractMentions = (delta: any): MentionRowsValue[] => {
  const mentions: any[] = [];

  // Loop through Delta ops to find mentions
  delta.ops.forEach((op: any) => {
    if (op.insert && op.insert.mention) {
      mentions.push(op.insert.mention);
    }
  });

  return mentions;
};

export const Comments = () => {
  const params = useParams();
  const quillRef = useRef<ReactQuill | null>(null);

  const [form] = Form.useForm();
  const { mutateAsync } = useGetUserSearch();
  const { mutate } = useManageComment();

  const handleGetMentions = (): MentionRowsValue[] => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();

      // Get the editor's content as Delta
      const content = quill.getContents();

      // Extract mentions from the content
      return extractMentions(content);
    }
    return [];
  };

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

  const onFinish = (values: ProjectCommentManage) => {
    const mentions = handleGetMentions();
    mutate({
      ...values,
      project_id: params.id,
      parent_id: form.getFieldValue('parent_id') || null,
      mentioned_users: [...new Set(mentions.map((item) => item.id))],
    });
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
        <CommentDataShow />
        <div>
          <ReplayText />
          <FormItem
            name="comments"
            rules={[
              {
                required: true,
                message: VALIDATE_MESSAGES.required,
              },
              {
                max: 5120,
                message: 'You have exceeded the allowed limit for the comment.',
              },
            ]}
          >
            <ReactQuill modules={modules} formats={formats} ref={(ref: ReactQuill) => (quillRef.current = ref)} />
          </FormItem>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};
