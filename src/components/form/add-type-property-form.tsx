import { Checkbox, Form, Space, Tooltip } from "antd"
import { FormInput } from "components/input"
import { Text } from "components/typography"
import { FormItem } from "./form-item"

import { InfoCircleFilled } from '@ant-design/icons';
import { Button } from "components/button";
import styled from "styled-components";
import { ProjectNodeTypeSubmit } from "types/project-node-types";
import { useDataSheetWrapper } from "components/layouts/components/data-sheet/wrapper";
import VerticalSpace from "components/space/vertical-space";
import { useEffect } from "react";
import { useCreateProjectNodeTypeProperty } from "api/project-node-type-property/use-create-project-node-type-property";
import { PropertyDataTypeSelect } from "components/select/property-data-type-select";
import { useDeleteProjectNodeTypeProperty } from "api/project-node-type-property/use-delete-project-node-type-property";

const Wrapper = styled.div`
    padding: 24px 24px 8px;
    width: 422px;
`;

type Props = {
    isEdit?: boolean;
}

export const AddTypePropertyForm = ({ isEdit = false }: Props) => {
    const { nodesList, finishAddType, color, titleText, parentId, selectNodeType, nodeTypeId, deleteEditType, finishEditType, cancelAddType } = useDataSheetWrapper();
    const { mutate } = useCreateProjectNodeTypeProperty({
        onSuccess: ({data}) => {
            selectNodeType({
                titleText: data.data.name, 
                color: data.data.color, 
                nodeTypeId: data.data.id,
                parentId: data.data.parent_id,
            });
        }
    }, isEdit ? nodeTypeId: undefined);
    const { mutate: mutateDelete } = useDeleteProjectNodeTypeProperty(nodeTypeId, {
        onSuccess: () => {
            deleteEditType();
        }
    });
    const [form] = Form.useForm();
    useEffect(() => {
        if (isEdit) {
            // form.setFieldsValue({
            //     'name': titleText,
            //     'color': color,
            //     'parent_id': parentId,
            // });
        }
    }, [color, form, isEdit, parentId, titleText]);

    const onFinish = (values: ProjectNodeTypeSubmit) => {
        mutate(isEdit ? {
            parent_id: values.parent_id,
            name: values.name,
            color: values.color
        } as ProjectNodeTypeSubmit : values);
        
        form.resetFields();
        if (isEdit) {
            finishEditType();
        } else {
            finishAddType();
        }
    };

    /** this action works only for create */
    const onHandleCancel = () => {
        cancelAddType();
        form.resetFields();
    }

    /** this action works only for edit */
    const onHandleDelete = () => {
        mutateDelete();
    }

    return <Wrapper>
        <Form
            name="project-node-type-property"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            requiredMark={false}
        >
            <Space size={8}>
                <Text>{isEdit ? 'Edit type' : 'Add property for type'}</Text>
                <Tooltip title="Useful information" placement='right'>
                    <InfoCircleFilled style={{ fontSize: 16, color:'#C3C3C3' }} />
                </Tooltip>
            </Space>
            <FormItem
                name="name" 
                label="Property name" 
                rules={[
                    { required: true, message: 'Property name name is required' }, 
                    { min: 3, message: 'The minimum length for this field is 3 characters'},
                    { max: 30, message: 'The maximum length for this field is 30 characters'}
                ]}>
                <FormInput placeholder='Property name' />
            </FormItem>
            <FormItem name="ref_property_type_id">
                <PropertyDataTypeSelect/>
            </FormItem>
                <FormItem name="required_type" valuePropName="checked">
                    <Space align="start">
                        <Checkbox>
                            Required
                        </Checkbox>
                        <Tooltip title="Useful information" placement='right'>
                            <InfoCircleFilled style={{ fontSize: 16, color:'#C3C3C3' }} />
                        </Tooltip>
                    </Space>
                </FormItem>
                <FormItem name="multiple_type" valuePropName="checked">
                    <Space align="start">
                        <Checkbox>
                            Multiple
                        </Checkbox>
                        <Tooltip title="Useful information" placement='right'>
                            <InfoCircleFilled style={{ fontSize: 16, color:'#C3C3C3' }} />
                        </Tooltip>
                    </Space>
                </FormItem>
                <FormItem name="unique_type" valuePropName="checked">
                    <Space align="start">
                        <Checkbox>
                            Set field as unique
                        </Checkbox>
                        <Tooltip title="Useful information" placement='right'>
                            <InfoCircleFilled style={{ fontSize: 16, color:'#C3C3C3' }} />
                        </Tooltip>
                    </Space>
                </FormItem>
            <FormItem>
                <VerticalSpace>
                    <Button block type="primary" htmlType="submit">Save</Button>
                    {isEdit ? <Button block type="text" onClick={onHandleDelete}>Delete</Button>
                     : <Button block type="text" onClick={onHandleCancel}>Cancel</Button>}
                </VerticalSpace>
            </FormItem>
        </Form>
    </Wrapper>
}