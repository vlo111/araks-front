import { Form, Space } from 'antd';
import { FormInput } from 'components/input';
import { Text } from 'components/typography';
import { FormItem } from './form-item';

import { Button } from 'components/button';
import styled from 'styled-components';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { VerticalSpace } from 'components/space/vertical-space';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { NodeEdgeTypePropertiesSubmit } from 'types/node-edge-types';
import { Rule } from 'antd/es/form';
import { PropertyDataConnectionTypeSelect } from 'components/select/property-data-connection-type-select';
import { useManageProjectNodeTypeProperty } from 'api/node-edge-type/use-manage-project-edge-type-property';
import { useGetProjectEdgeTypeProperty } from 'api/node-edge-type/use-get-project-edge-type-property';
import { UsefulInformationTooltip } from 'components/tool-tip/useful-information-tooltip';
import { EditEdgePropertyTypeInfoModal } from 'components/modal/edit-edge-property-type-info-modal';
import { ConnectionPropertyTypes } from './property/types';

const Wrapper = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

type Props = {
  isEdit?: boolean;
  hide?: () => void;
  propertyId?: string;
};

/** Add or edit properties for connection types */
export const AddConnectionTypePropertyForm = ({ isEdit = false, hide, propertyId }: Props) => {
  const { nodeTypeId } = useDataSheetWrapper();
  const { dispatch } = useTypeProperty();

  const { mutate } = useManageProjectNodeTypeProperty({
    onSuccess: () => {
      hide?.();
    },
  });

  const { data } = useGetProjectEdgeTypeProperty(propertyId, {
    enabled: !!propertyId,
    onSuccess: (data) => {
      form.setFieldsValue({
        ...data,
      });
    },
  });

  const [form] = Form.useForm();

  const onFinish = ({ ref_property_type_id, ...values }: NodeEdgeTypePropertiesSubmit) => {
    mutate({
      ...values,
      ref_property_type_id,
      propertyId: propertyId,
      project_type_id: nodeTypeId,
    } as NodeEdgeTypePropertiesSubmit);

    form.resetFields();
    if (isEdit) {
      /** @todo ACTION TYPE FOR connection */
      dispatch({ type: TypePropertyActionKind.EDIT_CONNECTION_TYPE_FINISH, payload: {} });
    } else {
      dispatch({ type: TypePropertyActionKind.ADD_CONNECTION_TYPE_FINISH, payload: {} });
    }
  };

  /** this action works only for create */
  const onHandleCancel = () => {
    hide?.();
    form.resetFields();
  };

  /** this action works only for edit */
  const onHandleDelete = () => {
    hide?.();
    dispatch({ type: TypePropertyActionKind.DELETE_CONNECTION_TYPE_START, payload: {} });
  };
  const handlePopoverClick = (e: React.MouseEvent<HTMLElement>) => {
    // Prevent the click event from bubbling up to the Collapse component
    e.stopPropagation();
  };

  return (
    <Wrapper onClick={handlePopoverClick}>
      <Form
        name="project-connection-type-property"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
      >
        <Space size={8}>
          <Text>{isEdit ? 'Edit connection property' : 'Add property for connection type'}</Text>
          <UsefulInformationTooltip infoText="Inherit parent options" />
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
        <FormItem
          name="ref_property_type_id"
          label="Data type"
          rules={[{ required: true, message: 'Connection property data type is required' }]}
        >
          <PropertyDataConnectionTypeSelect
            propertyTypeId={data?.ref_property_type_id as ConnectionPropertyTypes | undefined}
          />
        </FormItem>
        <FormItem>
          <VerticalSpace>
            {isEdit ? (
              <EditEdgePropertyTypeInfoModal id={data?.id} initPropertyType={data?.ref_property_type_id} />
            ) : (
              <Button block type="primary" htmlType="submit">
                Save
              </Button>
            )}
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
