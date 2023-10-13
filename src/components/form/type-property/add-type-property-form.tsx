import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form } from 'antd';
import styled from 'styled-components';
import { useCreateProjectNodeTypeProperty } from 'api/project-node-type-property/use-create-project-node-type-property';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { ProjectNodeTypePropertySubmit } from 'types/project-node-types-property';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { NodeEdgeTypesSubmit } from 'types/node-edge-types';
import { PropertyTypes } from '../property/types';
import { TypePropertyFormItems } from './type-property-steps-form-items/type-property-items';
import { CreateConnection } from './type-property-steps-form-items/create-connection-items';
import { ProjectEdgeForm } from 'types/project-edge';
import { useCreateEdge } from 'api/schema/edge/use-create-edge';
import { useParams } from 'react-router-dom';
import { GET_PROJECT_EDGE_TYPES } from 'api/node-edge-type/use-get-edge-types-beetwen-types';
import { useUpdateProjectEdgeType } from '../../../api/node-edge-type/use-update-type-connection';

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
  const { nodeTypeId, dataList } = useDataSheetWrapper();
  const { dispatch } = useTypeProperty();
  const [createConnection, setCreateConnection] = useState<{ selected?: string; isOpen: boolean } | undefined>();
  const [form] = Form.useForm();
  const { id } = useParams();
  const { mutate: createEdge } = useCreateEdge(id, {
    onSuccess: (data) => {
      setCreateConnection({ isOpen: false });
      GET_PROJECT_EDGE_TYPES.replace(':source_type_id', nodeTypeId || '').replace(
        ':target_type_id',
        form.getFieldValue('source_id')
      );

      form.resetFields(['connection_name']);

      form.setFieldValue('edit_connection_name', data.data.id);
    },
  });

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
  const { mutate: mutateConnection } = useUpdateProjectEdgeType(propertyId, {
    onSuccess: () => {
      hide?.();
      form.resetFields();
    },
  });

  const onFinish = (value: ProjectNodeTypePropertySubmit | NodeEdgeTypesSubmit | ProjectEdgeForm) => {
    if (createConnection?.isOpen) {
      /** ADD NEW CONNECTION */
      const { connection_name, inverse, multiple, target_id } = value as ProjectEdgeForm & { connection_name: string };

      const sourceId = nodeTypeId ?? '';

      const find = (id: string) =>
        dataList?.find((n) => n.id === id)?.properties?.find((p) => p.default_property) ?? { id: '' };

      const { id: source_attribute_id } = find(sourceId);

      const { id: target_attribute_id } = find(target_id);

      createEdge({
        name: connection_name,
        inverse,
        multiple,
        target_id,
        source_id: sourceId,
        source_attribute_id,
        target_attribute_id,
      });
    } else {
      // eslint-disable-next-line no-debugger
      debugger;
      /** EDIT PROPERTY WITH CONNECTION DATA TYPE */
      const { ref_property_type_id, ...values } = value as ProjectNodeTypePropertySubmit | NodeEdgeTypesSubmit;

      if (ref_property_type_id === PropertyTypes.Connection) {
        const { edit_connection_name, target_id } = value as (ProjectNodeTypePropertySubmit | NodeEdgeTypesSubmit) & {
          edit_connection_name: string;
          target_id: string;
        };

        mutateConnection({
          project_edge_type_id: edit_connection_name,
          target_type_id: target_id,
        });
      } else {
        mutate({
          ...values,
          ref_property_type_id,
          propertyId: propertyId,
          project_type_id: nodeTypeId,
        } as ProjectNodeTypePropertySubmit);
      }
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
          <CreateConnection setCreateConnection={setCreateConnection} />
        )}
      </Form>
    </Wrapper>
  );
};
