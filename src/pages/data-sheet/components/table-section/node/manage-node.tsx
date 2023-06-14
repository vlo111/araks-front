import { Col, Drawer, Form, Row } from 'antd';
import { useManageNodes } from 'api/node/use-manage-node';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { ProjectTypePropertyReturnData } from 'api/types';
import { Button } from 'components/button';
import { HorizontalButton } from 'components/button/horizontal-button';
import { AddNodeForm } from 'components/form/add-node-form';
import { PropertyTypes } from 'components/form/property/types';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { Location } from 'components/modal/types';
import { useState } from 'react';
import { NodeBody, NodeDataSubmit } from 'types/node';
import { getLocation } from './utils';

type Props = {
  tableHead: number;
};

export const ManageNode = ({ tableHead }: Props) => {
  const [open, setOpen] = useState(false);
  const { titleText, nodeTypeId, isConnectionType } = useDataSheetWrapper();

  const { isInitialLoading, data } = useGetProjectNodeTypeProperties(nodeTypeId, {
    enabled: !!(nodeTypeId && isConnectionType === false),
  });

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onOpen = () => {
    setOpen(true);
  };

  const { mutate } = useManageNodes();

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    right: 0,
    top: 0,
    overflow: 'hidden',
    textAlign: 'center',
    paddingLeft: '64px',
    paddingRight: '64px',
  };
  const [form] = Form.useForm();

  const onFinish = (values: NodeBody) => {
    const dataToSubmit = data?.map((item) => ({
      project_type_property_id: item.id,
      project_type_property_type: item.ref_property_type_id,
      nodes_data: !!values[item.name]
        ? item.ref_property_type_id === PropertyTypes.Location
          ? (values[item.name] as Location[]).map((item) => getLocation(item)).filter(Boolean)
          : Array.isArray(values[item.name])
          ? (values[item.name] as unknown[])?.filter(Boolean)
          : values[item.name]
        : null,
    }));

    mutate({
      nodes: dataToSubmit,
      project_type_id: nodeTypeId || '',
    } as NodeDataSubmit);
    onClose();
  };

  return (
    <>
      <HorizontalButton tableHead={tableHead} openForm={onOpen} formIsOpened={open} />
      <div style={containerStyle}>
        <Drawer
          title={`Add New Node / ${titleText}`}
          placement="top"
          closable={false}
          onClose={onClose}
          open={open}
          getContainer={false}
          contentWrapperStyle={{ marginRight: '135px', marginLeft: '135px', height: '100%' }}
          footer={
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
          }
        >
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
        </Drawer>
      </div>
    </>
  );
};
