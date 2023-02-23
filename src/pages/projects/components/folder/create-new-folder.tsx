import { Form } from "antd";
import { CreateFolderFormData, useCreateFolder } from "api/folders/use-create-folder";
import { AddFolderButton, Button } from "components/button"
import { FormItem } from "components/form/form-item";
import { Input } from "components/input";
import { Modal } from "components/modal";
import VerticalSpace from "components/space/vertical-space";
import { Text } from "components/typography";
import { useState } from "react";

export const CreateNewFolder = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { mutate } = useCreateFolder();

    const [form] = Form.useForm();
    const onFinish = (values: CreateFolderFormData) => {
        mutate(values)
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const afterClose = () => {
        form.resetFields();
    };
    return <>
        <AddFolderButton block onClick={showModal} />
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
                    <FormItem name="folderName" label="Folder name" rules={[{ required: true, message: 'Folder name is required' }, { min: 3, message: 'The minimum length for this field is 3 characters'}]}>
                        <Input placeholder='Folder name' />
                    </FormItem>
                    <Button block htmlType="submit" type="primary">OK</Button>
                    <Button block type="default" onClick={handleCancel}>Cancel</Button>
                </VerticalSpace>
            </Form>
        </Modal>
    </>
}