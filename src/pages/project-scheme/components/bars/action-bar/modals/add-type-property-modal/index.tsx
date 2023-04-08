import React, { useMemo } from 'react';
import { Modal } from 'antd';

import { useSchema } from 'components/layouts/components/schema/wrapper';
import { AddSchemaTypePropertyForm } from '../../form/add-property-type-form';

interface IPosition {
  left: number;
  top: number;
}

export const AddTypePropertyModal: React.FC = () => {
  const { addPortModal } = useSchema() || {};

  const position: IPosition = useMemo(() => {
    return {
      left: addPortModal?.x ?? 0,
      top: addPortModal?.y ?? 0,
    };
  }, [addPortModal]);

  return (
    <Modal
      style={{ position: 'fixed', ...position }}
      // onCancel={() => setOpenAddType(undefined)}
      open={addPortModal !== undefined}
      footer={false}
    >
      <AddSchemaTypePropertyForm />
    </Modal>
  );
};
