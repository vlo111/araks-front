import React, { useCallback } from 'react';

import { Modal } from 'components/modal';
import { AddLinkWrapper } from './wrapper';

interface IAddLinkProps {
  openAddLink: boolean;
  setOpenAddLink: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddLinkModal: React.FC<IAddLinkProps> = ({ openAddLink, setOpenAddLink }) => {
  const onClose = useCallback(() => {
    setOpenAddLink(false);
  }, [setOpenAddLink]);

  return (
    <>
      <Modal
        footer={false}
        open={openAddLink}
        onCancel={onClose}
        closable={false}
        width="496px"
        centered
      >
        <AddLinkWrapper onClose={onClose} />
      </Modal>
    </>
  );
};
