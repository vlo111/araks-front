import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form } from 'antd';
import styled from 'styled-components';
import { useCreateProjectNodeTypeProperty } from 'api/project-node-type-property/use-create-project-node-type-property';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { ProjectNodeTypePropertySubmit } from 'types/project-node-types-property';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useCreateNodeEdgeType } from 'api/node-edge-type/use-create-node-edge-type';
import { NodeEdgeTypesSubmit } from 'types/node-edge-types';
import { PropertyTypes } from '../property/types';
import { useQueryClient } from '@tanstack/react-query';
import { GET_PROJECT_NODE_TYPE_PROPERTIES_LIST } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { TypePropertyFormItems } from './type-property-steps-form-items/type-property-items';

const Wrapper = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

export type SetCreateConnection = Dispatch<SetStateAction<{ selected?: string; isOpen: boolean } | undefined>>;

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
  const [createConnection, setCreateConnection] = useState<{ selected?: string; isOpen: boolean } | undefined>();

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
      onError: () => {
        hide?.();
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
        {!createConnection?.isOpen ? (
          <TypePropertyFormItems
            hide={hide}
            setCreateConnection={setCreateConnection}
            isConnectionType={isConnectionType}
            isEdit={isEdit}
            propertyId={propertyId}
          />
        ) : (
          <div>create conn</div>
        )}
      </Form>
    </Wrapper>
  );
};
