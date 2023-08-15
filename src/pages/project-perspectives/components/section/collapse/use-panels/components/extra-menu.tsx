import React, { useMemo } from 'react';
import { Button } from 'antd';
import { ExtraSelect } from './extra';

type ExtraMenuProp = React.FC<{ setOpenModal: React.Dispatch<React.SetStateAction<ExtraSelect>> }>;

export const ExtraMenu: ExtraMenuProp = ({ setOpenModal }) => {
  const editStyle = useMemo(
    () => ({
      fontWeight: '600',
      letterSpacing: '0.07em',
      cursor: 'pointer',
      padding: 0,
      background: 'none',
      border: 'none',
      height: 'auto',
    }),
    []
  );

  return (
    <>
      <Button style={{ ...editStyle, color: '#808080' }} onClick={() => setOpenModal(ExtraSelect.EDIT)}>
        Edit
      </Button>
      <Button style={{ ...editStyle, color: '#c51c16' }} onClick={() => setOpenModal(ExtraSelect.DELETE)}>
        Delete
      </Button>
    </>
  );
};
