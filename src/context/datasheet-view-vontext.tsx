import { Col, Drawer, Form, Row } from 'antd';
import * as React from 'react';
import { NodeBody, NodeDataResponse, NodeDataSubmit, NodePropertiesValues, ResponseLocationType } from 'types/node';
import { VIewNode } from 'pages/data-sheet/components/table-section/node/view-node';
import { ViewNodeTitle } from 'pages/data-sheet/components/table-section/node/view-node-title';
import { AddNodeForm } from 'components/form/add-node-form';
import { useManageNodes } from 'api/node/use-manage-node';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { groupedData, setNodeDataUpdateValue } from 'pages/data-sheet/components/table-section/node/utils';
import { NodeDataConnectionToSave, ProjectTypePropertyReturnData } from 'api/types';
import { useGetNode } from 'api/node/use-get-node';
import { Button } from 'components/button';
import { PropertyTypes } from 'components/form/property/types';
import { Location } from 'components/modal/types';
import dayjs from 'dayjs';

type VIewDataType = NodeDataResponse | undefined;

type Dispatch = React.Dispatch<React.SetStateAction<VIewDataType>>;
type ViewDatasheetProviderProps = { children: React.ReactNode };

const ViewDatasheetContext = React.createContext<{ state: VIewDataType; dispatch: Dispatch } | undefined>(undefined);

function ViewDatasheetProvider({ children }: ViewDatasheetProviderProps) {
  const { nodeTypeId, isConnectionType } = useDataSheetWrapper();
  const [drawerWidth, setDrawerWidth] = React.useState<number>(0);
  const [form] = Form.useForm();

  const [selectedView, setSelectedView] = React.useState<VIewDataType>();
  const [isEdit, setIsEdit] = React.useState(false);
  const value = React.useMemo(() => ({ state: selectedView, dispatch: setSelectedView }), [selectedView]);

  const { data } = useGetProjectNodeTypeProperties(nodeTypeId, {
    enabled: !!(nodeTypeId && isConnectionType === false),
  });

  const onClose = () => {
    setSelectedView(undefined);
    setIsEdit(false);
    form.resetFields();
  };

  React.useEffect(() => {
    if (selectedView) {
      let calcWidth = 0;
      const rightSideWidth = document.getElementById('datasheet-data');
      const columnsProperty = document.querySelectorAll(
        '.ant-table-thead .node-property-column.ant-table-cell-fix-left'
      );

      const firstFourElements = Array.from(columnsProperty);
      firstFourElements.forEach((column: Element) => {
        calcWidth += column.clientWidth || 0;
      });
      setDrawerWidth((rightSideWidth?.clientWidth ?? 0) - calcWidth);
    }
  }, [selectedView]);

  const { mutate } = useManageNodes();

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

  const { data: nodeData, isInitialLoading } = useGetNode(selectedView?.id as string, {
    enabled: !!(selectedView?.id && isEdit),
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
          // item.project_type_property_type === PropertyTypes.Location
          //   ? (item.nodes_data as ResponseLocationType[])?.map(
          //       (addr: ResponseLocationType) =>
          //         ({
          //           address: addr.address,
          //           lat: addr.location.latitude,
          //           lng: addr.location.longitude,
          //         } as Location)
          //     )
          //   : item.nodes_data,
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

  const onFinish = (values: NodeBody) => {
    const mainData = {
      name: (values.name as string[]).join(''),
      default_image: (values.node_icon as string[]).join(''),
    };

    const dataToSubmit = nodeData?.properties
      ?.map((item) => {
        return item.project_type_property_type !== PropertyTypes.Connection
          ? {
              id: item.id,
              project_type_property_id: item.project_type_property_id,
              project_type_property_type: item.project_type_property_type,
              nodes_data: setNodeDataUpdateValue(item, values),
            }
          : null;
      })
      .filter(Boolean);

    const dataToSubmitEdges = data
      ?.map((item) => {
        return item.ref_property_type_id === PropertyTypes.Connection
          ? (values[item.name] as NodeDataConnectionToSave[])?.map((itemConn) => ({
              id: itemConn.rowId,
              target_id: itemConn.target_id,
              target_type_id: itemConn.target_type_id,
              project_edge_type_id: itemConn.id,
            }))
          : null;
      })
      .filter(Boolean);

    if (nodeData?.id) {
      mutate({
        ...mainData,
        nodes: dataToSubmit,
        edges: dataToSubmitEdges?.flat() || [],
        project_type_id: nodeTypeId || '',
        nodeId: nodeData.id,
      } as NodeDataSubmit);
      onClose();
    }
  };
  return (
    <ViewDatasheetContext.Provider value={value}>
      {children}
      <Drawer
        title={
          <ViewNodeTitle setIsEdit={setIsEdit} isEdit={isEdit} id={selectedView?.id as string} onClose={onClose} />
        }
        mask={false}
        placement="right"
        onClose={onClose}
        afterOpenChange={(open) => {
          !open && setSelectedView(undefined);
        }}
        open={!!selectedView}
        getContainer={false}
        width={drawerWidth}
        footer={
          isEdit && (
            <Row gutter={16} justify="center">
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
          )
        }
        contentWrapperStyle={{ height: '100%' }}
      >
        {isEdit ? (
          <Form
            name="project-node-manage"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            requiredMark={false}
          >
            <AddNodeForm data={data as ProjectTypePropertyReturnData[]} isInitialLoading={isInitialLoading} />
          </Form>
        ) : (
          <VIewNode />
        )}
      </Drawer>
    </ViewDatasheetContext.Provider>
  );
}

function useViewDatasheet() {
  const context = React.useContext(ViewDatasheetContext);
  if (context === undefined) {
    throw new Error('useViewDatasheet must be used within a ViewDatasheetProvider');
  }
  return context;
}

export { ViewDatasheetProvider, useViewDatasheet };
