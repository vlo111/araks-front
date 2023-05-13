import { useMemo } from 'react';
import { WrapperModal } from './edge-property-wrapper';
import { EdgePropertyTools } from './edge-property-tools';
import { EdgePropertyList } from './edge-property-list';
import { useSchema } from '../../../../../../../../components/layouts/components/schema/wrapper';
import { CSSProperties } from 'styled-components';
import { Props } from '../types/property';

const MODAL_WIDTH = 232;

export const ShowPropertyModal: Props = ({ setOpenCreateProperty }) => {
  const { openLinkPropertyModal, setOpenLinkPropertyModal } = useSchema() || {};

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
    <WrapperModal style={{ ...position }} {...props}>
      <EdgePropertyTools openEditModal={setOpenCreateProperty} />
      <EdgePropertyList openEditModal={setOpenCreateProperty} />
    </WrapperModal>
  );
};
