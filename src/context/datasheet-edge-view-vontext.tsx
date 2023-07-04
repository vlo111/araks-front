import { Col, Drawer, Form, Row, Skeleton } from 'antd';
import * as React from 'react';
import { NodeBody, NodeDataResponse, NodeDataSubmit, NodePropertiesValues, ResponseLocationType } from 'types/node';
import { useManageNodes } from 'api/node/use-manage-node';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { groupedData, setNodeDataUpdateValue } from 'pages/data-sheet/components/table-section/node/utils';
import { NodeDataConnectionToSave } from 'api/types';
import { useGetNode } from 'api/node/use-get-node';
import { Button } from 'components/button';
import { PropertyTypes } from 'components/form/property/types';
import { Location } from 'components/modal/types';
import dayjs from 'dayjs';
import { useIsXXlScreen } from 'hooks/use-breakpoint';

type VIewDataType = NodeDataResponse | undefined;

type Dispatch = React.Dispatch<React.SetStateAction<string>>;
type ViewDatasheetEdgeProviderProps = { children: React.ReactNode };

const ViewDatasheetEdgeContext = React.createContext<{ state: VIewDataType; dispatch: Dispatch } | undefined>(
  undefined
);

function ViewDatasheetEdgeProvider({ children }: ViewDatasheetEdgeProviderProps) {
  const isXXl = useIsXXlScreen();

  const { nodeTypeId, isConnectionType } = useDataSheetWrapper();
  const [drawerWidth, setDrawerWidth] = React.useState<number>(0);
  const [form] = Form.useForm();

  const [selectedView, setSelectedView] = React.useState<VIewDataType>();
  const [selectedViewId, setSelectedViewId] = React.useState<string>();

  const [isEdit, setIsEdit] = React.useState(false);
  const value = React.useMemo(() => ({ state: selectedView, dispatch: setSelectedViewId as Dispatch }), [selectedView]);

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
      if (!firstFourElements.length) {
        calcWidth = isXXl ? 350 : 200;
      }
      firstFourElements.forEach((column: Element) => {
        calcWidth += column.clientWidth || 0;
      });
      setDrawerWidth((rightSideWidth?.clientWidth ?? 0) - calcWidth);
    }
  }, [selectedView, isXXl]);

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

  const { data: nodeData, isInitialLoading } = useGetNode(selectedViewId as string, {
    enabled: !!selectedViewId,
    onSuccess: (nodeData) => {
      setSelectedView(nodeData);
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
    <ViewDatasheetEdgeContext.Provider value={value}>
      {children}
      <Drawer
        title={'View Edge'}
        mask={false}
        placement="right"
        onClose={onClose}
        afterOpenChange={(open) => {
          if (!open) {
            setSelectedView(undefined);
            setSelectedViewId(undefined);
          }
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
            In Progress
          </Form>
        ) : isInitialLoading ? (
          <Skeleton />
        ) : (
          'View In Progress'
        )}
      </Drawer>
    </ViewDatasheetEdgeContext.Provider>
  );
}

function useViewDatasheetEdge() {
  const context = React.useContext(ViewDatasheetEdgeContext);
  if (context === undefined) {
    throw new Error('useViewDatasheetEdge must be used within a ViewDatasheetEdgeProvider');
  }
  return context;
}

export { ViewDatasheetEdgeProvider, useViewDatasheetEdge };
