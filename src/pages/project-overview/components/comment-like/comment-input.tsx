import { MentionRowsValue } from 'api/user/types';
import { useGetUserSearch } from 'api/user/use-get-user-search';
import { useMemo } from 'react';
import ReactQuill from 'react-quill';

const formats = ['bold', 'italic', 'underline', 'mention'];

// Define custom toolbar options with only bold, italic, and underline styles
const toolbarOptions = [['bold', 'italic', 'underline']];

// Customize the formats allowed in the editor to only include bold, italic, and underline styles

type SourceRenderList = (matches: MentionRowsValue[], searchForm?: string) => void;

export const CommentInput = () => {
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
  return <ReactQuill modules={modules} formats={formats} />;
};
