import { Form } from 'antd';
import { CreateFolderFormData, useManageFolder } from 'api/folders/use-manage-folder';
import { RequestType } from 'api/types';
import { Button } from 'components/button';
import { FormItem } from 'components/form/form-item';
import { Input } from 'components/input';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { useEffect } from 'react';

type Props = {
  initialValue?: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  url?: string;
  type?: RequestType;
};

export const FolderModal = ({ isModalOpen, setIsModalOpen, initialValue, url, type }: Props) => {
  const { mutate } = useManageFolder(url, type);

  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValue) {
      form.setFieldValue('folderName', initialValue);
    }
  }, [form, initialValue]);

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
      >
        <Form
          name="create-new-folder"
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
