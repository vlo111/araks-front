import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useDeleteComment } from 'api/comments/use-delete-comment';
import { Button } from 'components/button';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { useState } from 'react';

type Props = {
  id: string;
};

export const DeleteComment = ({ id }: Props) => {
  const [isDeleteStart, setDeleteStart] = useState(false);
  const { mutate } = useDeleteComment(id);

  const handleDelete = async () => {
    await mutate();
    setDeleteStart(false);
  };
  return (
    <>
      <CloseOutlined key="delete" onClick={() => setDeleteStart(true)} />
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
