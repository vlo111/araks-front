import { useMemo } from 'react';
import { WrapperModal } from './edge-property-wrapper';
import { EdgePropertyTools } from './edge-property-tools';
import { EdgePropertyList } from './edge-property-list';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { CSSProperties } from 'styled-components';
import { Props } from '../types/property';

const MODAL_WIDTH = 232;

export const ShowPropertyModal: Props = ({ setOpenCreateProperty }) => {
  const {
    edge_port: { x, y, isOpened, color },
    finishEdgePort,
  } = useSchema() || {};

  const position: CSSProperties = useMemo(
    () => ({
      position: 'fixed',
      top: y ?? 0,
      left: (x ?? 0) - MODAL_WIDTH / 2,
    }),
    [x, y]
  );

  const props = {
    mask: false,
    closable: false,
    footer: false,
    open: isOpened,
    onCancel: finishEdgePort,
    width: `${MODAL_WIDTH}px`,
    color: color ?? [],
  };

  return (
    <WrapperModal style={{ ...position }} {...props} zIndex={5}>
      <EdgePropertyTools openEditModal={setOpenCreateProperty} />
      <EdgePropertyList openEditModal={setOpenCreateProperty} />
    </WrapperModal>
  );
};
