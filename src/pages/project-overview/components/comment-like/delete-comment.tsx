import { CloseOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { URL_COMMENTS_NODES_LIST, URL_COMMENT_DELETE, URL_COMMENT_NODES_DELETE } from 'api/comments/constants';
import { useDeleteComment } from 'api/comments/use-delete-comment';
import { Button } from 'components/button';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { useState } from 'react';

type Props = {
  id: string;
  nodeId?: string;
};

export const DeleteComment = ({ id, nodeId }: Props) => {
  const [isDeleteStart, setDeleteStart] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useDeleteComment(id, nodeId ? URL_COMMENT_NODES_DELETE : URL_COMMENT_DELETE, {
    onSuccess: () => {
      if (nodeId) {
        queryClient.invalidateQueries([URL_COMMENTS_NODES_LIST.replace(':node_id', nodeId as string)]);
      }
    },
  });

  const handleDelete = async () => {
    await mutate();
    setDeleteStart(false);
  };
  return (
    <>
      <CloseOutlined key="delete" onClick={() => setDeleteStart(true)} style={{ color: COLORS.PRIMARY.GRAY }} />
      <Modal
        title={<Text style={{ textAlign: 'center' }}>Are you sure you wish to permanently remove this comment?</Text>}
        open={isDeleteStart}
        footer={false}
        closable={false}
        className="project-modal"
      >
        <VerticalSpace>
          <Button block onClick={handleDelete} type="primary">
            Delete
          </Button>
          <Button
            block
            type="default"
            onClick={() => {
              setDeleteStart(false);
            }}
          >
            Cancel
          </Button>
        </VerticalSpace>
      </Modal>
    </>
  );
};
