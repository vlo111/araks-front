import React, { useMemo } from 'react';
import { Form } from 'antd';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { AddSchemaEdgePropertyForm } from '../../form/add-edge-property';
import { WrapperModal } from './wrapper';
import { CSSProperties } from 'styled-components';

const MODAL_WIDTH = 232;

export const AddEdgePropertyModal: React.FC = () => {
  const [form] = Form.useForm();
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
      form.resetFields();
    },
    width: `${MODAL_WIDTH}px`,
    color: openLinkPropertyModal?.color ?? [],
  };

  return (
    <WrapperModal style={{ ...position }} {...props}>
      <AddSchemaEdgePropertyForm form={form} />
    </WrapperModal>
  );
};
