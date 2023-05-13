import React from 'react';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { ReactComponent as ArrowsSVG } from './icons/arrows.svg';
import { ReactComponent as PlusSVG } from './icons/plus.svg';
import { ReactComponent as EditSVG } from './icons/edit.svg';
import { OpenEditModal } from '../types/property';

type EdgePropertyProp = {
  openEditModal: OpenEditModal;
};

export const EdgePropertyTools: React.FC<EdgePropertyProp> = ({ openEditModal }) => {
  const { openLinkPropertyModal } = useSchema() || {};

  return (
    <div className="name">
      <div className="icon">
        <ArrowsSVG />
      </div>
      <span className="text">{openLinkPropertyModal?.name}</span>
      <div className="add-property-icon" onClick={() => openEditModal(true)}>
        <EditSVG />
        <PlusSVG />
      </div>
    </div>
  );
};
