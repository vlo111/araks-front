import { useEffect } from 'react';
import { Form } from 'antd';
import { CreateFolderFormData, useManageFolder } from 'api/folders/use-manage-folder';
import { RequestType } from 'api/types';
import { Button } from 'components/button';
import { FormItem } from 'components/form/form-item';
import { Input } from 'components/input';
import { Modal } from 'components/modal';
import { Text } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';

type Props = {
  initialValue?: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  url?: string;
  type?: RequestType;
};

export const CreateEditFolderModal = ({ isModalOpen, setIsModalOpen, initialValue, url, type }: Props) => {
  const { mutate } = useManageFolder(url, type);

  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValue && isModalOpen) {
      form.setFieldValue('folderName', initialValue);
    }
  }, [form, initialValue, isModalOpen]);

  const onFinish = (values: CreateFolderFormData) => {
    mutate(values);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const afterClose = () => {
    form.resetFields();
  };

  return (
    <>
      <Modal
        title={<Text style={{ textAlign: 'center' }}>New Folder</Text>}
        open={isModalOpen}
        footer={false}
        closable={false}
        afterClose={afterClose}
        forceRender
        destroyOnClose
      >
        <Form
          name="create-edit-new-folder"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
        >
          <VerticalSpace>
            <FormItem
              name="folderName"
              label="Folder name"
              rules={[
                { required: true, message: 'Folder name is required' },
                { min: 3, message: 'The minimum length for this field is 3 characters' },
                { max: 30, message: 'The maximum length for this field is 30 characters' },
              ]}
            >
              <Input placeholder="Folder name" />
            </FormItem>
            <Button block htmlType="submit" type="primary">
              OK
            </Button>
            <Button block type="default" onClick={handleCancel}>
              Cancel
            </Button>
          </VerticalSpace>
        </Form>
      </Modal>
    </>
  );
};
