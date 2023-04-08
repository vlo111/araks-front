import { useEffect } from 'react';
import styled from 'styled-components';
import { InfoCircleFilled } from '@ant-design/icons';
import { Checkbox, Form, Space, Tooltip } from 'antd';

import { FormInput } from 'components/input';
import { Text } from 'components/typography';
import { FormItem } from 'components/form/form-item';
import { Button } from 'components/button';
import { TreeSelect } from 'components/select';
import { ColorSelect } from 'components/select/color-select';
import { VerticalSpace } from 'components/space/vertical-space';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useCreateProjectNodeType } from 'api/project-node-types/use-create-project-node-type';
import { useDeleteProjectNodeType } from 'api/project-node-types/use-delete-project-node-type';
import { ProjectNodeTypeSubmit } from 'types/project-node-types';
import {useSchema} from "../../../../../../components/layouts/components/schema/wrapper";

const Wrapper = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

type Props = {
    isEdit?: boolean;
};

export const AddSchemaTypeForm = ({ isEdit = false }: Props) => {
    const {
        nodesList,
        finishAddType,
        color,
        titleText,
        parentId,
        selectNodeType,
        nodeTypeId,
        deleteEditType,
        finishEditType,
    } = useDataSheetWrapper();

    const { setAddTypeModal } = useSchema() || {};

    const { mutate } = useCreateProjectNodeType(
        {
            onSuccess: ({ data }) => {
                selectNodeType({
                    titleText: data.name,
                    color: data.color,
                    nodeTypeId: data.id,
                    parentId: data.parent_id,
                });
            },
        },
        isEdit ? nodeTypeId : undefined
    );
    const { mutate: mutateDelete } = useDeleteProjectNodeType(nodeTypeId, {
        onSuccess: () => {
            deleteEditType();
        },
    });
    const [form] = Form.useForm();
    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({
                name: titleText,
                color: color,
                parent_id: parentId,
            });
        }
    }, [color, form, isEdit, parentId, titleText]);

    const onFinish = (values: ProjectNodeTypeSubmit) =>
    {
        mutate(
            isEdit
                ? ({
                    parent_id: values.parent_id,
                    name: values.name,
                    color: values.color,
                } as ProjectNodeTypeSubmit)
                : values
        );

        form.resetFields();
        if (isEdit) {
            finishEditType();
        } else {
            finishAddType();
        }
    };

    /** this action works only for create */
    const onHandleCancel = () => {
        setAddTypeModal(undefined);

        form.resetFields();
    };

    /** this action works only for edit */
    const onHandleDelete = () => {
        mutateDelete();
    };

    return (
        <Wrapper>
            <Form
                name="project-node-type"
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                requiredMark={false}
            >
                <Space size={8}>
                    <Text>{isEdit ? 'Edit type' : 'Write new type data'}</Text>
                    <Tooltip title="Useful information" placement="right">
                        <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
                    </Tooltip>
                </Space>
                <FormItem
                    name="name"
                    label="Node type"
                    rules={[
                        { required: true, message: 'Node type name is required' },
                        { min: 3, message: 'The minimum length for this field is 3 characters' },
                        { max: 30, message: 'The maximum length for this field is 30 characters' },
                    ]}
                >
                    <FormInput placeholder="Node type" />
                </FormItem>
                <FormItem name="parent_id">
                    <TreeSelect
                        treeData={nodesList}
                        showSearch
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="Please select"
                        allowClear
                        treeDefaultExpandAll
                        fieldNames={{ value: 'key' }}
                        value={parentId}
                    />
                </FormItem>

                {!isEdit && (
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.parent_id !== currentValues.parent_id}
                    >
                        {({ getFieldValue }) => (
                            <Space align="start">
                                <FormItem name="inherit" valuePropName="checked">
                                    <Checkbox disabled={!getFieldValue('parent_id')}>Inherit properties</Checkbox>
                                </FormItem>
                                <Tooltip title="Useful information" placement="right">
                                    <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
                                </Tooltip>
                            </Space>
                        )}
                    </Form.Item>
                )}
                <FormItem name="color" rules={[{ required: true, message: 'Node type color is required' }]}>
                    <ColorSelect initialColor={isEdit ? color : undefined} />
                </FormItem>
                <FormItem>
                    <VerticalSpace>
                        <Button block type="primary" htmlType="submit">
                            Save
                        </Button>
                        {isEdit ? (
                            <Button block type="text" onClick={onHandleDelete}>
                                Delete
                            </Button>
                        ) : (
                            <Button block type="text" onClick={onHandleCancel}>
                                Cancel
                            </Button>
                        )}
                    </VerticalSpace>
                </FormItem>
            </Form>
        </Wrapper>
    );
};
