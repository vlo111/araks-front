import { Col, Drawer, Form, Row } from 'antd';
import * as React from 'react';
import { NodeBody, NodeDataResponse, NodeDataSubmit, NodePropertiesValues, ResponseLocationType } from 'types/node';
import { VIewNode } from 'pages/data-sheet/components/table-section/node/view-node';
import { ViewNodeTitle } from 'pages/data-sheet/components/table-section/node/view-node-title';
import { AddNodeForm } from 'components/form/add-node-form';
import { useManageNodes } from 'api/node/use-manage-node';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { getLocation } from 'pages/data-sheet/components/table-section/node/utils';
import { ProjectTypePropertyReturnData } from 'api/types';
import { useGetNode } from 'api/node/use-get-node';
import { Button } from 'components/button';
import { PropertyTypes } from 'components/form/property/types';
import { Location } from 'components/modal/types';

type VIewDataType = NodeDataResponse | undefined;

type Dispatch = React.Dispatch<React.SetStateAction<VIewDataType>>;
type ViewDatasheetProviderProps = { children: React.ReactNode };

const ViewDatasheetContext = React.createContext<{ state: VIewDataType; dispatch: Dispatch } | undefined>(undefined);

function ViewDatasheetProvider({ children }: ViewDatasheetProviderProps) {
  const { nodeTypeId, isConnectionType } = useDataSheetWrapper();
  const [drawerWidth, setDrawerWidth] = React.useState<number>(0);

  const [selectedView, setSelectedView] = React.useState<VIewDataType>();
  const [isEdit, setIsEdit] = React.useState(false);
  const value = React.useMemo(() => ({ state: selectedView, dispatch: setSelectedView }), [selectedView]);

  const { isInitialLoading, data } = useGetProjectNodeTypeProperties(nodeTypeId, {
    enabled: !!(nodeTypeId && isConnectionType === false),
  });

  const onClose = () => {
    setSelectedView(undefined);
    setIsEdit(false);
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

  const [form] = Form.useForm();

  const { data: nodeData } = useGetNode(selectedView?.id as string, {
    enabled: !!(selectedView?.id && data?.length && isEdit),
    onSuccess: (nodeData) => {
      const initialAcc = data?.reduce(
        (initAcc, initItem) => ({
          ...initAcc,
          [initItem.name]: [''],
        }),
        {} as NodeBody
      );

      const fieldsData = nodeData.properties?.reduce((acc, item) => {
        if (!item.nodes_data?.length) {
          return acc;
        }

        return {
          ...acc,
          [item.nodeType.name]:
            item.project_type_property_type === PropertyTypes.Location
              ? (item.nodes_data as ResponseLocationType[])?.map(
                  (addr: ResponseLocationType) =>
                    ({
                      address: addr.address,
                      lat: addr.location.latitude,
                      lng: addr.location.longitude,
                    } as Location)
                )
              : item.nodes_data,
        } as NodePropertiesValues;
      }, initialAcc);

      form.setFieldsValue(fieldsData);
    },
  });

  const onFinish = (values: NodeBody) => {
    const dataToSubmit = data?.map((item) => ({
      project_type_property_id: item.id,
      project_type_property_type: item.ref_property_type_id,
      id: nodeData?.properties?.find((prop) => prop.nodeType.name === item.name)?.id,
      nodes_data: !!values[item.name]
        ? item.ref_property_type_id === PropertyTypes.Location
          ? (values[item.name] as Location[]).map((item) => getLocation(item)).filter(Boolean)
          : Array.isArray(values[item.name])
          ? (values[item.name] as unknown[])?.filter(Boolean)
          : values[item.name]
        : null,
    }));

    if (nodeData?.id) {
      mutate({
        nodes: dataToSubmit,
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
