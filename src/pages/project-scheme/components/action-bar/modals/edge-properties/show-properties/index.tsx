import { useMemo } from 'react';
import { WrapperModal } from './edge-property-wrapper';
import { EdgePropertyTools } from './edge-property-tools';
import { EdgePropertyList } from './edge-property-list';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { CSSProperties } from 'styled-components';
import { Props } from '../types/property';

const MODAL_WIDTH = 232;

export const ShowPropertyModal: Props = ({ setOpenCreateProperty }) => {
  const { edge_port, finishEdgePort } = useSchema() || {};

  const position: CSSProperties = useMemo(
    () => ({
      position: 'fixed',
      top: edge_port?.y ?? 0,
      left: (edge_port?.x ?? 0) - MODAL_WIDTH / 2,
    }),
    [edge_port?.x, edge_port?.y]
  );

  const props = {
    mask: false,
    closable: false,
    footer: false,
    open: edge_port?.isOpened,
    onCancel: finishEdgePort,
    width: `${MODAL_WIDTH}px`,
    color: edge_port?.color ?? [],
  };

  return (
    <WrapperModal style={{ ...position }} {...props}>
      <EdgePropertyTools openEditModal={setOpenCreateProperty} />
      <EdgePropertyList openEditModal={setOpenCreateProperty} />
    </WrapperModal>
  );
};
