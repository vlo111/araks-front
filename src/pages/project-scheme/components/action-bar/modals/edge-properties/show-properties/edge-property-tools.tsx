import React from 'react';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { ReactComponent as ArrowsSVG } from './icons/arrows.svg';
import { ReactComponent as PlusSVG } from './icons/plus.svg';
import { ReactComponent as EditSVG } from './icons/edit.svg';
import { OpenEditModal } from '../types/property';
import { useProject } from 'context/project-context';
import { UserProjectRole } from 'api/types';

type EdgePropertyProp = {
  openEditModal: OpenEditModal;
};

export const EdgePropertyTools: React.FC<EdgePropertyProp> = ({ openEditModal }) => {
  const { edge_port, startEdgeType } = useSchema() || {};
  const { projectInfo } = useProject();

  return (
    <div className="name">
      <div className="icon">
        <ArrowsSVG />
      </div>
      <span className="text">{edge_port?.name}</span>
      {projectInfo?.role === UserProjectRole.Owner && (
        <>
          <div
            className="edit-property-icon"
            onClick={() => {
              startEdgeType({ id: edge_port?.id, isUpdate: true });
            }}
          >
            <EditSVG />
          </div>
          <div className="add-property-icon" onClick={() => openEditModal(true)}>
            <PlusSVG />
          </div>
        </>
      )}
    </div>
  );
};
