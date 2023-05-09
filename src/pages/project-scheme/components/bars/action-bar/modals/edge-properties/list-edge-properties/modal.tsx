import React, { useMemo, useState } from 'react';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { WrapperModal } from './wrapper';
import { CSSProperties } from 'styled-components';
import { ReactComponent as ArrowsSVG } from './icons/arrows.svg';
import { ReactComponent as PlusSVG } from './icons/plus.svg';
import { AddSchemaEdgePropertyForm } from '../create-edge-property';
import { EdgePropertyList } from './list';
import { useGetProjectsEdgeTypeProperties } from '../../../../../../../../api/node-edge-type/use-get-projects-edge-type-properties';

const MODAL_WIDTH = 232;

export const AddEdgePropertyModal: React.FC = () => {
  const { openLinkPropertyModal, setOpenLinkPropertyModal } = useSchema() || {};

  const { data, isInitialLoading } = useGetProjectsEdgeTypeProperties(openLinkPropertyModal?.id, {
    enabled: !!openLinkPropertyModal?.id,
  });
  const [openCreateProperty, setOpenCreateProperty] = useState(false);

  const position: CSSProperties = useMemo(
    () => ({
      position: 'fixed',
      top: openLinkPropertyModal?.y ?? 0,
      left: (openLinkPropertyModal?.x ?? 0) - MODAL_WIDTH / 2,
    }),
    [openLinkPropertyModal?.x, openLinkPropertyModal?.y]
  );

  const props = {
    mask: false,
    closable: false,
    footer: false,
    open: openLinkPropertyModal?.open,
    onCancel: () => {
      setOpenLinkPropertyModal({
        ...openLinkPropertyModal,
        open: false,
      });
    },
    width: `${MODAL_WIDTH}px`,
    color: openLinkPropertyModal?.color ?? [],
  };

  return (
    <>
      {openLinkPropertyModal?.id && !isInitialLoading && (
        <>
          <WrapperModal style={{ ...position }} {...props}>
            <div className="name">
              <div className="icon">
                <ArrowsSVG />
              </div>
              <span className="text">{openLinkPropertyModal?.name}</span>
              <div className="add-property-icon" onClick={() => setOpenCreateProperty(true)}>
                <PlusSVG />
              </div>
            </div>
            <EdgePropertyList list={data} />
          </WrapperModal>
          <AddSchemaEdgePropertyForm open={openCreateProperty} onClose={setOpenCreateProperty} />
        </>
      )}
    </>
  );
};
