import { Modal } from 'components/modal';
import { AddSchemaEdgePropertyForm } from '../../../form/add-edge-property';
import { Props } from '../types/property';
import { Form } from 'antd';

const MODAL_WIDTH = 500;

export const CreatePropertyModal: Props = ({ openCreateProperty, setOpenCreateProperty }) => {
  const [form] = Form.useForm();

  const props = {
    open: openCreateProperty !== false,
    centered: true,
    footer: false,
    onCancel: () => {
      setOpenCreateProperty(false);
      form.resetFields();
    },
    width: `${MODAL_WIDTH}px`,
  };

  return (
    <Modal {...props}>
      <AddSchemaEdgePropertyForm
        form={form}
        open={openCreateProperty}
        onCancel={props.onCancel}
        isEdit={typeof openCreateProperty === 'string'}
      />
    </Modal>
  );
};
