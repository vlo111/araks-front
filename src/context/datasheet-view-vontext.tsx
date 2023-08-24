import { Col, Drawer, Form, Row, Skeleton, UploadFile } from 'antd';
import * as React from 'react';
import {
  NodeBody,
  NodeDataResponse,
  NodeDataSubmit,
  NodePropertiesValues,
  ResponseLocationType,
  UploadedFileType,
} from 'types/node';
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
import { useIsXXlScreen } from 'hooks/use-breakpoint';
import { getConnectionFormName } from 'components/form/type/connection-type';
import { setUploadFileStructure } from 'pages/data-sheet/utils';

type VIewDataType = NodeDataResponse | undefined;

type Dispatch = React.Dispatch<React.SetStateAction<string>>;
type ViewDatasheetProviderProps = { children: React.ReactNode };

/** returns value for form item */
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
    case PropertyTypes.IMAGE_URL:
      return (item.nodes_data as string[])?.map((rec, index) => setUploadFileStructure(rec, `Image ${index}`));
    case PropertyTypes.Document:
      return (item.nodes_data as UploadedFileType[])?.map((rec) => setUploadFileStructure(rec.url, rec.name));
    default:
      return item.nodes_data;
  }
};

const ViewDatasheetContext = React.createContext<{ state: VIewDataType; dispatch: Dispatch } | undefined>(undefined);

function ViewDatasheetProvider({ children }: ViewDatasheetProviderProps) {
  const isXXl = useIsXXlScreen();

  const { nodeTypeId, isConnectionType } = useDataSheetWrapper();
  const [drawerWidth, setDrawerWidth] = React.useState<number>(0);
  const [form] = Form.useForm();

  const [selectedView, setSelectedView] = React.useState<VIewDataType>();
  const [selectedViewId, setSelectedViewId] = React.useState<string>();

  const [isEdit, setIsEdit] = React.useState(false);
  const value = React.useMemo(() => ({ state: selectedView, dispatch: setSelectedViewId as Dispatch }), [selectedView]);

  const { data: nodeData, isInitialLoading } = useGetNode(selectedViewId as string, {
    enabled: !!selectedViewId,
    onSuccess: (nodeData) => {
      /** use this to show data for view */
      setSelectedView(nodeData);

      const fieldsData = nodeData.properties?.reduce((acc, item) => {
        if (!item.nodes_data?.length) {
          return acc;
        }

        return {
          ...acc,
          [item.nodeTypeProperty.name]: getValue(item),
        } as NodePropertiesValues;
      }, {});
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
      /** sets form values for edit */
      form.setFieldsValue({
        ...fieldsData,
        name: [nodeData.name],
        node_icon: nodeData.default_image
          ? [setUploadFileStructure(nodeData.default_image, 'Default image')]
          : undefined,
        ...connectionFieldsData,
      });
    },
  });

  // eslint-disable-next-line no-console
  console.log('nodeData', nodeData);

  const { data } = useGetProjectNodeTypeProperties(nodeData?.project_type_id, {
    enabled: !!(nodeData?.project_type_id && isConnectionType === false),
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

  const onFinish = (values: NodeBody) => {
    const mainData = {
      name: (values.name as string[]).join(''),
      default_image: values.node_icon ? (values.node_icon as UploadFile[])[0].response.data.uploadPath : '',
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
        const formName = getConnectionFormName(item.name, item.id);
        return item.ref_property_type_id === PropertyTypes.Connection
          ? (values[formName] as NodeDataConnectionToSave[])?.map((itemConn) => ({
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
        title={<ViewNodeTitle setIsEdit={setIsEdit} isEdit={isEdit} id={selectedViewId as string} onClose={onClose} />}
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
            <AddNodeForm data={data as ProjectTypePropertyReturnData[]} isInitialLoading={isInitialLoading} />
          </Form>
        ) : isInitialLoading ? (
          <Skeleton />
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
