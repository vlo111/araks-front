import { Col, Drawer, Form, Row } from 'antd';
import * as React from 'react';
import { NodeBody } from 'types/node';
import { Button } from 'components/button';
import { useIsXXlScreen } from 'hooks/use-breakpoint';
import { EdgesCreate, EdgesCreateProperties, EdgeSourceData, EdgeTargetData, ETypeEdgeData } from 'types/edges';
import { AddConnectionNodeForm } from 'components/form/add-connection-node-form';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useGetProjectsEdgeTypeProperties } from 'api/node-edge-type/use-get-projects-edge-type-properties';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import { ViewEdgeTitle } from 'pages/data-sheet/components/connection-table/components/view-edge-title';
import { useManageEdge } from 'api/edges/use-manage-edge';

type VIewDataType = ETypeEdgeData | undefined;

type Dispatch = React.Dispatch<React.SetStateAction<VIewDataType>>;
type ViewDatasheetEdgeProviderProps = { children: React.ReactNode };

const ViewDatasheetEdgeContext = React.createContext<{ state: VIewDataType; dispatch: Dispatch } | undefined>(
  undefined
);

function ViewDatasheetEdgeProvider({ children }: ViewDatasheetEdgeProviderProps) {
  const isXXl = useIsXXlScreen();

  const { nodeTypeId, isConnectionType } = useDataSheetWrapper();

  const [selectedView, setSelectedView] = React.useState<VIewDataType>();
  const [drawerWidth, setDrawerWidth] = React.useState<number>(0);
  const [isEdit, setIsEdit] = React.useState(false);

  const [form] = Form.useForm();

  const { isInitialLoading, data } = useGetProjectsEdgeTypeProperties(nodeTypeId, {
    enabled: !!(nodeTypeId && isConnectionType === true && !!selectedView),
  });

  const { mutate } = useManageEdge(selectedView?.project_edge_type_id);

  React.useEffect(() => {
    if (data && data.source && selectedView) {
      form.setFieldsValue({
        sourceData: [
          {
            source_type_id: data.source.id,
            source_id: selectedView?.source.id,
            name: selectedView?.source.name,
            id: data.id,
          },
        ],
        targetData: [
          {
            target_type_id: data.target.id,
            source_id: selectedView?.target.id,
            name: selectedView?.target.name,
            id: data.id,
          },
        ],
        ...data.properties.reduce((acc, prop) => {
          const currentValue = selectedView?.properties?.find((property) => property.edge_type_property_id === prop.id);
          return {
            ...acc,
            [prop.name]: currentValue ? [currentValue.data] : [null],
          };
        }, {}),
      });
    }
  }, [data, form, selectedView]);

  const value = React.useMemo(() => ({ state: selectedView, dispatch: setSelectedView }), [selectedView]);

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

  const onFinish = (values: NodeBody) => {
    const dataToSubmit = {
      project_edge_type_id: nodeTypeId,
      target_type_id: (values.targetData as EdgeTargetData[])[0].target_type_id,
      target_id: (values.targetData as EdgeTargetData[])[0].target_id,
      source_type_id: (values.sourceData as EdgeSourceData[])[0].source_type_id,
      source_id: (values.sourceData as EdgeSourceData[])[0].source_id,
      properties: data?.properties.reduce((curr, item) => {
        return [
          ...curr,
          {
            edge_type_property_id: item.id,
            edge_type_property_type: item.ref_property_type_id,
            data: (values[item.name] as (string | number)[])[0],
          },
        ] as EdgesCreateProperties[];
      }, [] as EdgesCreateProperties[]),
    } as EdgesCreate;
    mutate(dataToSubmit);
    onClose();
  };
  
  return (
    <ViewDatasheetEdgeContext.Provider value={value}>
      {children}
      <Drawer
        title={<ViewEdgeTitle setIsEdit={setIsEdit} isEdit={isEdit} onClose={onClose} />}
        mask={false}
        placement="right"
        onClose={onClose}
        bodyStyle={{ backgroundColor: '#F2F2F2', padding: '40px 0' }}
        afterOpenChange={(open) => {
          if (!open) {
            setSelectedView(undefined);
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
        <Form
          name="project-connection-node-manage"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          disabled={!isEdit}
        >
          <AddConnectionNodeForm data={data as EdgeTypePropertiesResponse} isInitialLoading={isInitialLoading} />
        </Form>
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
