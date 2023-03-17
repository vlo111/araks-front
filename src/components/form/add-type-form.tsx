import { Checkbox, Form, Space, Tooltip } from "antd"
import { FormInput, Input } from "components/input"
import { Text } from "components/typography"
import { FormItem } from "./form-item"

import { InfoCircleFilled } from '@ant-design/icons';
import { Button } from "components/button";
import styled from "styled-components";
import { TreeSelect } from "components/select";
import { ColorSelect } from "components/select/color-select";
import { useCreateProjectNodeType } from "api/project-node-types/use-create-project-node-type";
import { ProjectNodeTypeSubmit } from "types/project-node-types";
import { useDataSheetWrapper } from "components/layouts/components/data-sheet/wrapper";
import VerticalSpace from "components/space/vertical-space";

const Wrapper = styled.div`
    padding: 24px 24px 8px;
    width: 422px;
`;

export const AddTypeForm = () => {
    const { nodesListLabel, finishAddType } = useDataSheetWrapper();
    const { mutate } = useCreateProjectNodeType();
    const [form] = Form.useForm();

    const onFinish = (values: ProjectNodeTypeSubmit) => {
        mutate(values);
        finishAddType();
        form.resetFields();
    };

    const onHandleCancel = () => {
        finishAddType();
        form.resetFields();
    }

    return <Wrapper>
        <Form
            name="project-node-type"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            requiredMark={false}
        >
            <Space size={8}>
                <Text>Write new type data</Text>
                <Tooltip title="Useful information" placement='right'>
                    <InfoCircleFilled style={{ fontSize: 16, color:'#C3C3C3' }} />
                </Tooltip>
            </Space>
            <FormItem
                name="name" 
                label="Node type" 
                rules={[
                    { required: true, message: 'Folder name is required' }, 
                    { min: 3, message: 'The minimum length for this field is 3 characters'},
                    { max: 30, message: 'The maximum length for this field is 30 characters'}
                ]}>
                <FormInput placeholder='Node type' />
            </FormItem>
            <FormItem name="parent_id">
                <TreeSelect treeData={nodesListLabel} />
            </FormItem>

            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.parent_id !== currentValues.parent_id}
            >
                {({ getFieldValue }) =><Space align="start">
                    <FormItem name="inherit" valuePropName="checked">
                        <Checkbox disabled={!getFieldValue('parent_id')}>
                            Inherit properties
                        </Checkbox>
                    </FormItem>
                    <Tooltip title="Useful information" placement='right'>
                        <InfoCircleFilled style={{ fontSize: 16, color:'#C3C3C3' }} />
                    </Tooltip>
                </Space>
                }
            </Form.Item>
            <FormItem name="color">
                <ColorSelect />
            </FormItem>
            <FormItem>
                <VerticalSpace>
                    <Button block type="primary" htmlType="submit">Save</Button>
                    <Button block type="text" onClick={onHandleCancel}>Cancel</Button>
                </VerticalSpace>
            </FormItem>
        </Form>
    </Wrapper>
}