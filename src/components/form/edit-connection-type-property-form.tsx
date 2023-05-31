import { useEffect } from 'react';
import { Form, Space, Tooltip } from 'antd';
import { Rule } from 'antd/es/form';
import styled from 'styled-components';
import { InfoCircleFilled } from '@ant-design/icons';

import { FormInput } from 'components/input';
import { Text } from 'components/typography';
import { FormItem } from './form-item';
import { Button } from 'components/button';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { ProjectNodeTypePropertySubmit } from 'types/project-node-types-property';
import { VerticalSpace } from 'components/space/vertical-space';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropertyConnectionDetails } from './property/property-connection-details';
import { NodeEdgeTypesSubmit } from 'types/node-edge-types';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import { PropertyTypes } from './property/types';
import { useCreateNodeEdgeType } from 'api/node-edge-type/use-create-node-edge-type';
import { DataSheetActionKind } from 'components/layouts/components/data-sheet/hooks/data-sheet-manage';

const Wrapper = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

type Props = {
  connectionData: EdgeTypePropertiesResponse;
  hide?: () => void;
};

export const EditConnectionTypePropertyForm = ({ hide, connectionData }: Props) => {
  const { dispatch: dispatchDataSheet, dataList } = useDataSheetWrapper();
  const { dispatch } = useTypeProperty();

  const [form] = Form.useForm();
  const { mutate: mutateConnection } = useCreateNodeEdgeType(connectionData.id, {
    onSuccess: ({ data }) => {
      dispatchDataSheet({
        type: DataSheetActionKind.CONNECTION_SELECTED,
        payload: {
          titleText: data.name,
        },
      });
      form.resetFields();
      dispatch({ type: TypePropertyActionKind.EDIT_TYPE_FINISH, payload: {} });
      hide?.();
    },
  });

  useEffect(() => {
    if (connectionData) {
      form.setFieldsValue({
        ...connectionData,
        ref_property_type_id: PropertyTypes.Connection,
      });
    }
  }, [connectionData, form]);

  const onFinish = ({ ref_property_type_id, ...values }: ProjectNodeTypePropertySubmit | NodeEdgeTypesSubmit) => {
    mutateConnection({
      ...values,
      target_attribute_id: dataList
        ?.find((listItem) => listItem.id === (values as NodeEdgeTypesSubmit)?.target_id)
        ?.properties?.find((property) => property.default_proprty === true)?.id,
      source_attribute_id: dataList
        ?.find((listItem) => listItem.id === (values as NodeEdgeTypesSubmit)?.source_id)
        ?.properties?.find((property) => property.default_proprty === true)?.id,
    } as NodeEdgeTypesSubmit);
  };

  /** this action works only for edit */
  const onHandleDelete = () => {
    dispatch({ type: TypePropertyActionKind.DELETE_TYPE_START, payload: {} });
    hide?.();
  };
  const handlePopoverClick = (e: React.MouseEvent<HTMLElement>) => {
    // Prevent the click event from bubbling up to the Collapse component
    e.stopPropagation();
  };

  return (
    <Wrapper onClick={handlePopoverClick}>
      <Form
        name="project-node-type-property"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
      >
        <Space size={8}>
          <Text>Edit type</Text>
          <Tooltip title="Useful information" placement="right">
            <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
          </Tooltip>
        </Space>
        <FormItem
          name="name"
          label="Property name"
          rules={[
            { required: true, message: 'Property name is required' },
            { min: 3, message: 'The minimum length for this field is 3 characters' },
            { max: 30, message: 'The maximum length for this field is 30 characters' },
            {
              validator: async (_: Rule, value: string | undefined) => {
                if (value !== undefined) {
                  const regex = /^[a-z0-9_]+$/;
                  if (!regex.test(value)) {
                    return Promise.reject('Name must only contain lowercase letters, numbers and underscores');
                  }
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <FormInput placeholder="Property name" />
        </FormItem>
        <PropertyConnectionDetails isConnectionType />
        <FormItem>
          <VerticalSpace>
            <Button block type="primary" htmlType="submit">
              Save
            </Button>
            <Button block type="text" onClick={onHandleDelete}>
              Delete
            </Button>
          </VerticalSpace>
        </FormItem>
      </Form>
    </Wrapper>
  );
};
