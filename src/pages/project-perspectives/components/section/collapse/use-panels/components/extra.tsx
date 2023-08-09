import { PerspectiveActionPopover } from 'components/popover';
import { ReactComponent as MoreSvg } from '../../icons/more.svg';
import { ExtraMenu } from './extra-menu';
import { useState } from 'react';
import { EditPerspectiveModal } from '../../modals/edit-perspective';
import { DeletePerspectiveModal } from '../../modals/delete-perspective';

export enum ExtraSelect {
  CLOSE = '',
  EDIT = 'edit',
  DELETE = 'delete',
}

export const Extra = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const [openModal, setOpenModal] = useState(ExtraSelect.CLOSE);

  const isEdit = openModal === ExtraSelect.EDIT;
  const isDelete = openModal === ExtraSelect.DELETE;

  const onCancel = () => setOpenModal(ExtraSelect.CLOSE);

  return (
    <>
      <PerspectiveActionPopover
        content={<ExtraMenu setOpenModal={setOpenModal} />}
        open={open}
        trigger="click"
        autoAdjustOverflow={false}
        onOpenChange={(value: boolean) => {
          setOpen(!open);
          return value;
        }}
      >
        <MoreSvg style={{ display: 'flex' }} onClick={(event) => event.stopPropagation()} />
      </PerspectiveActionPopover>
      {isEdit && <EditPerspectiveModal id={id} open={isEdit} onCancel={onCancel} />}
      {isDelete && <DeletePerspectiveModal id={id} open={isDelete} onCancel={onCancel} />}
    </>
  );
};
