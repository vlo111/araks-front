import { useNodes } from 'hooks/use-nodes';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { Col, Drawer, Form, Row } from 'antd';
import { Button } from 'components/button';
import { MenuText, Text } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';
import { COLORS } from 'helpers/constants';
import { getRowData } from '../../data-sheet/components/table-section/node/utils';
import { useGetNode } from 'api/node/use-get-node';

export const NodeView = () => {
  const [form] = Form.useForm();

  const { nodes, openNode, finishOpenNode } = useGraph() ?? {};

  const node = nodes?.find((n: { node_id: string }) => n?.node_id === openNode?.id);

  useNodes();

  const onClose = () => {
    finishOpenNode();
    form.resetFields();
  };

  const { data } = useGetNode(node?.node_id ?? '');

  return (
    <Drawer
      getContainer={false}
      mask={false}
      title={<MenuText strong>{node?.node_name}</MenuText>}
      width={600}
      onClose={onClose}
      open={openNode?.isOpened}
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
      <VerticalSpace>
        {data?.properties ? (
          data.properties.map((d) => {
            return (
              <VerticalSpace key={d.id}>
                <Text color={COLORS.PRIMARY.BLUE}>{d.nodeTypeProperty.name}</Text>
                {getRowData(d)}
              </VerticalSpace>
            );
          })
        ) : (
          <></>
        )}
      </VerticalSpace>
    </Drawer>
  );
};
