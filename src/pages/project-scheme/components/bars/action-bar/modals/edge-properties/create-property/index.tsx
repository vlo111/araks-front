import { Modal } from 'components/modal';
import { AddSchemaEdgePropertyForm } from '../../../form/add-edge-property';
import { Props } from '../types/property';

const MODAL_WIDTH = 500;

export const CreatePropertyModal: Props = ({ openCreateProperty, setOpenCreateProperty }) => {
  const props = {
    open: openCreateProperty !== false,
    centered: true,
    footer: false,
    onCancel: () => setOpenCreateProperty(false),
    width: `${MODAL_WIDTH}px`,
  };

  return (
    <Modal {...props}>
      <AddSchemaEdgePropertyForm
        open={openCreateProperty}
        onClose={setOpenCreateProperty}
        isEdit={typeof openCreateProperty === 'string'}
      />
    </Modal>
  );
};
