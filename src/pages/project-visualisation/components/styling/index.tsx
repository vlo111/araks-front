import { useState } from 'react';
import { Form } from 'antd';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { QueriesForm } from 'components/form/all-data/queries-form';
import { NodePropertiesValues } from 'types/node';
import { Buttons } from '../buttons';
import { StyledMainWrapper } from './styles';
import G6, { IEdge, INode } from '@antv/g6';

type Props = {
  queries: Array<
    NodePropertiesValues & { color: string; size: number; icon: string; borderSize: number; borderDashed: string }
  >;
};

export const Styling = () => {
  const { graph } = useGraph() ?? {};
  const [form] = Form.useForm();
  const [openTable, setOpenTable] = useState(false);
  const [filteredEdges, setFilteredEdges] = useState<IEdge[]>([]);
  const [filteredNodes, setFilteredNodes] = useState<INode[]>([]);
  const initialSize = 40;
  const borderInitSize = 6;

  const onFinish = (values: Props) => {
    if (values.queries) {
      values.queries.forEach((query) => {
        const filteredNodes = graph.getNodes().filter((node) => node.getModel().nodeType === query.id);
        setFilteredNodes((prevState) => [...prevState, ...filteredNodes]);
        filteredNodes.forEach((node) => {
          graph.updateItem(node.getID(), {
            size: query.size || initialSize,
            icon: {
              show: node.getModel()?.img ? query.icon : query.icon,
              width: query.size / 1.5,
              height: query.size / 1.5,
              img: node.getModel()?.img ? query.icon : query.icon,
            },
            type: query.icon,
            style: {
              stroke: query.color,
            },
          });
        });
        const filteredEdges = graph.getEdges().filter((edge) => edge.getModel().project_edge_type_id === query.id);
        setFilteredEdges((prevState) => [...prevState, ...filteredEdges]);
        filteredEdges.forEach((edge) => {
          graph.updateItem(edge.getID() as string, {
            size: query.size,
            style: {
              stroke: query.color,
              lineWidth: query.borderSize || borderInitSize,
              lineDash: query.borderDashed ? [query.borderSize, 4] : [],
              endArrow: {
                fill: query.color,
                path: G6.Arrow.triangle(10, 15, 5),
                d: 5,
              },
            },
          });
        });
      });
    }
  };

  return (
    <Form form={form} name="styling" onFinish={onFinish} style={{ height: '100%' }}>
      <StyledMainWrapper>
        <QueriesForm openTable={openTable} setOpenTable={setOpenTable} isVisualisation={true} />
        <Buttons
          filteredEdges={filteredEdges}
          setOpenTable={setOpenTable}
          filteredNodes={filteredNodes}
          resetFields={form?.resetFields}
        />
      </StyledMainWrapper>
    </Form>
  );
};
