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
  const { edge_port, startEdgeType } = useSchema() || {};

  return (
    <div className="name">
      <div className="icon">
        <ArrowsSVG />
      </div>
      <span className="text">{edge_port?.name}</span>
      <div
        className="edit-property-icon"
        onClick={() => {
          startEdgeType({ id: edge_port?.id });
        }}
      >
        <EditSVG />
      </div>
      <div className="add-property-icon" onClick={() => openEditModal(true)}>
        <PlusSVG />
      </div>
    </div>
  );
};
