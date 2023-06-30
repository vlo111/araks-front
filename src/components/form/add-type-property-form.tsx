import { useEffect } from 'react';
import { Form, Space, Tooltip } from 'antd';
import { FormInput } from 'components/input';
import { Text } from 'components/typography';
import { FormItem } from './form-item';

import { InfoCircleFilled } from '@ant-design/icons';
import { Button } from 'components/button';
import styled from 'styled-components';
import { useCreateProjectNodeTypeProperty } from 'api/project-node-type-property/use-create-project-node-type-property';
import { PropertyDataTypeSelect } from 'components/select/property-data-type-select';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { ProjectNodeTypePropertySubmit } from 'types/project-node-types-property';
import { VerticalSpace } from 'components/space/vertical-space';
import { useGetProjectNodeTypeProperty } from 'api/project-node-type-property/use-get-project-node-type-property';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropertyBasicDetails } from './property/property-basic-details';
import { PropertyConnectionDetails } from './property/property-connection-details';
import { useCreateNodeEdgeType } from 'api/node-edge-type/use-create-node-edge-type';
import { NodeEdgeTypesSubmit } from 'types/node-edge-types';
import { PropertyTypes } from './property/types';
import { Rule } from 'antd/es/form';
import { useQueryClient } from '@tanstack/react-query';
import { GET_PROJECT_NODE_TYPE_PROPERTIES_LIST } from 'api/project-node-type-property/use-get-project-node-type-properties';

const Wrapper = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

type Props = {
  isEdit?: boolean;
  hide: () => void;
  propertyId?: string;
  isConnectionType?: boolean;
};

/** This component used only for creating node type property, editing node type property and for creating type connection property */
export const AddTypePropertyForm = ({ isEdit = false, hide, propertyId, isConnectionType = false }: Props) => {
  const queryClient = useQueryClient();
  const { nodeTypeId, dataList } = useDataSheetWrapper();
  const { dispatch } = useTypeProperty();

  // create node type property
  const { mutate } = useCreateProjectNodeTypeProperty(
    {
      onSuccess: ({ data }) => {
        hide?.();
        form.resetFields();
        if (isEdit) {
          dispatch({ type: TypePropertyActionKind.EDIT_TYPE_FINISH, payload: {} });
        } else {
          dispatch({ type: TypePropertyActionKind.ADD_TYPE_FINISH, payload: {} });
        }
      },
    },
    isEdit ? propertyId : undefined
  );

  // connect connection property
  const { mutate: mutateConnection } = useCreateNodeEdgeType(undefined, {
    onSuccess: ({ data }) => {
      hide?.();
      form.resetFields();
      queryClient.invalidateQueries([GET_PROJECT_NODE_TYPE_PROPERTIES_LIST.replace(':node_type_id', nodeTypeId || '')]);
    },
  });

  // get node type edit data
  useGetProjectNodeTypeProperty(propertyId, {
    enabled: !!propertyId,
    onSuccess: (data) => {
      form.setFieldsValue({
        ...data,
      });
    },
  });

  const [form] = Form.useForm();

  const onFinish = ({ ref_property_type_id, ...values }: ProjectNodeTypePropertySubmit | NodeEdgeTypesSubmit) => {
    if (ref_property_type_id === PropertyTypes.Connection) {
      mutateConnection({
        ...values,
        target_attribute_id: dataList
          ?.find((listItem) => listItem.id === (values as NodeEdgeTypesSubmit)?.target_id)
          ?.properties?.find((property) => property.default_property === true)?.id,
        source_attribute_id: dataList
          ?.find((listItem) => listItem.id === (values as NodeEdgeTypesSubmit)?.source_id)
          ?.properties?.find((property) => property.default_property === true)?.id,
      } as NodeEdgeTypesSubmit);
    } else {
      mutate({
        ...values,
        ref_property_type_id,
        propertyId: propertyId,
        project_type_id: nodeTypeId,
      } as ProjectNodeTypePropertySubmit);
    }
  };

  /** this action works only for create */
  const onHandleCancel = () => {
    dispatch({ type: TypePropertyActionKind.ADD_TYPE_CANCEL, payload: { titleText: undefined } });
    hide?.();
    // form.resetFields();
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

  /** Set default as connection type when clicked from left menu connection type add button */
  useEffect(() => {
    if (isConnectionType === true) {
      form.setFieldValue('ref_property_type_id', PropertyTypes.Connection);
    }
  }, [form, isConnectionType]);

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
          <Text>{isConnectionType ? 'Connection type' : isEdit ? 'Edit type' : 'Add property for type'}</Text>
          <Tooltip title="Useful information" placement="right">
            <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
          </Tooltip>
        </Space>
        <FormItem
          name="name"
          label={isConnectionType ? 'Connection name' : 'Property name'}
          rules={[
            {
              required: true,
              message: isConnectionType ? 'Connection name is required' : 'Property name is required',
            },
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
          <FormInput placeholder={isConnectionType ? 'Connection name' : 'Property name'} />
        </FormItem>
        <FormItem
          name="ref_property_type_id"
          label="Data type"
          rules={[{ required: true, message: 'Node property data type is required' }]}
          hidden={isConnectionType === true || form.getFieldValue('default_property')}
        >
          <PropertyDataTypeSelect />
        </FormItem>
        <PropertyBasicDetails />
        <PropertyConnectionDetails isConnectionType={isConnectionType} />
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
