import React from 'react';
import { Modal } from 'antd';

import { useSchema } from 'components/layouts/components/schema/wrapper';
import { AddSchemaTypePropertyForm } from '../form/add-property-type';

// interface IPosition {
//   left: number;
//   top: number;
// }

export const AddTypePropertyModal: React.FC = () => {
  const { addPortModal, setAddPortModal } = useSchema() || {};

  // const position: IPosition = useMemo(() => {
  //   return {
  //     left: addPortModal?.x ?? 0,
  //     top: addPortModal?.y ?? 0,
  //   };
  // }, [addPortModal]);
  // style={{ position: 'fixed', ...position }}

  const props = {
    open: addPortModal !== undefined,
    footer: false,
    centered: true,
    onCancel: () => {
      setAddPortModal(undefined)
    },
    // mask: false,
  };

  return (
    <Modal {...props}>
      <AddSchemaTypePropertyForm />
    </Modal>
  );
};
