import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { Text } from "components/typography";
import { VerticalSpace } from 'components/space/vertical-space';
import { getRowData, groupedData } from "../../../data-sheet/components/table-section/node/utils";
import { Drawer } from 'components/drawer/node-drawer/view-node-drawer';
import { COLORS } from "helpers/constants";
import { Col, Form, Image, Row } from "antd";
import { NodeViewTitle } from "./node-view-title";
import * as React from "react";
import { AddNodeForm } from "components/form/add-node-form";
import { ProjectTypePropertyReturnData } from "api/types";
import {
  useGetProjectNodeTypeProperties
} from "api/project-node-type-property/use-get-project-node-type-properties";
import { useGetNode } from "api/node/use-get-node";
import { NodePropertiesValues, ResponseLocationType } from "types/node";
import { PropertyTypes } from "components/form/property/types";
import { Location } from "components/modal/types";
import dayjs from "dayjs";
import { Button } from "components/button";

export const NodeView = () => {
  const [form] = Form.useForm();

  const { nodes, openNode, finishOpenNode } = useGraph() ?? {};
  const [isEdit, setIsEdit] = React.useState(false);

  const onClose = () => {
    // del
    setIsEdit(false);

    finishOpenNode()
  };

  const node = nodes?.find((n) => n?.id === openNode?.id);

  const getValue = (item: NodePropertiesValues) => {
    switch (item.project_type_property_type) {
      case PropertyTypes.Location:
        return (item.nodes_data as ResponseLocationType[])?.map(
          (addr: ResponseLocationType) =>
            ({
              address: addr.address,
              lat: addr.location.latitude,
              lng: addr.location.longitude,
            } as Location)
        );
      case PropertyTypes.DateTime:
      case PropertyTypes.Date:
        return item.nodes_data?.map((rec) => dayjs(rec as string));
      default:
        return item.nodes_data;
    }
  };

  const { data: nodeData } = useGetNode(node?.id ?? '', { enabled: !!node?.id,
    onSuccess: (nodeData) => {
    const initialAcc = {
      name: [nodeData.name],
      node_icon: [nodeData.default_image],
    };

    const fieldsData = nodeData.properties?.reduce((acc, item) => {
      if (!item.nodes_data?.length) {
        return acc;
      }

      return {
        ...acc,
        [item.nodeTypeProperty.name]: getValue(item),
      } as NodePropertiesValues;
    }, initialAcc);
    const groupList = groupedData(nodeData.edges);

    const connectionFieldsData = Object.entries(groupList).reduce((acc, [key, item]) => {
      return {
        ...acc,
        [key]: item.map((row) => ({
          rowId: row.id,
          id: row.edgeTypes.id,
          name: row.nodes.name,
          target_id: row.target_id,
          target_type_id: row.target_type_id,
        })),
      };
    }, {});

    form.setFieldsValue({
      ...fieldsData,
      name: [nodeData.name],
      node_icon: [nodeData.default_image],
      ...connectionFieldsData,
    });
  },
  });

  const { isInitialLoading, data: properties } = useGetProjectNodeTypeProperties(node?.nodeType.id, {
    enabled: !!(node?.nodeType.id),
    onSuccess: (data) => {
      // form.setFieldValue('parent_id', parent_id)
    }
  });
  return (
    <Drawer
      headerStyle={{
        borderTop: `6px solid ${node?.nodeType.color}`,
      }}
      closable={false}
      onClose={onClose}
      title={<NodeViewTitle setIsEdit={setIsEdit} isEdit={isEdit} id={nodeData?.id as string} data={nodeData} onClose={onClose} />}
      footer={
        isEdit && <Row gutter={16} justify="center">
          <Col span={4}>
            <Button style={{ marginRight: 8 }} onClick={onClose} block>
              Cancel
            </Button>
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={() => form.submit()} block>
              Save
            </Button>
          </Col>
        </Row>
      }
      open={openNode?.isOpened}
    >
      {isEdit ? (
        <Form
          form={form}
          name="node-edit-form"
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
        >
          <AddNodeForm data={properties as ProjectTypePropertyReturnData[]} isInitialLoading={isInitialLoading} />
        </Form>
      ) : (
        <VerticalSpace>
          {nodeData?.default_image && (
            <Image src={nodeData?.default_image} width={161} height={127} style={{ borderRadius: '4px' }} />
          )}
          <VerticalSpace>
            <Text color={COLORS.PRIMARY.BLUE}>name</Text>
            <Text>{nodeData?.name}</Text>
          </VerticalSpace>
          {nodeData?.properties ? (
            nodeData.properties.map((d) => {
              return (
                <VerticalSpace key={d.id}>
                  <div color={COLORS.PRIMARY.BLUE}>{d.nodeTypeProperty.name}</div>
                  {getRowData(d)}
                </VerticalSpace>
              );
            })
          ) : (
            <></>
          )}
        </VerticalSpace>
      )}
    </Drawer>
  );
};
