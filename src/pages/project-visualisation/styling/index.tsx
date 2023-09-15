import { useState } from 'react';
import { Form } from 'antd';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { QueriesForm } from 'components/form/all-data/queries-form';
import { NodePropertiesValues } from 'types/node';
import { Buttons } from '../components/buttons';
import { StyledMainWrapper } from './styles';
import G6, { IEdge, INode } from '@antv/g6';
import { QueryType } from './enums';

type Props = {
  queries: Array<
    NodePropertiesValues & {
      color: string;
      size: number;
      icon: string;
      borderSize: number;
      borderDashed: string;
      parent_id: string;
      type: string;
      typeText: string;
    }
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
      graph.getNodes().forEach((node) => {
        graph.updateItem(node.getID(), {
          size: 40,
          icon: {
            show: false,
          },
          style: {
            stroke: node.getModel()?.color as string,
          },
        });
      });
      values.queries.forEach((query) => {
        if (query.parent_id) {
          const typeIsNot = query.type === QueryType.IsNot;
          const typeIs = query.type === QueryType.Is;
          const typeText = query.typeText ? query.typeText.toLowerCase() : '';
          const filteredNodes = graph
            .getNodes()
            .filter((node) =>
              node.getModel().nodeType === query.parent_id && typeIsNot
                ? (node.getModel().label as string).toLowerCase() !== typeText
                : typeIs
                ? (node.getModel().label as string).toLowerCase() === typeText
                : (node.getModel().label as string).toLowerCase().includes(typeText)
            );
          setFilteredNodes((prevState) => [...prevState, ...filteredNodes]);
          filteredNodes.forEach((node) => {
            graph.updateItem(node.getID(), {
              size: query.size || initialSize,
              icon: {
                show: node.getModel()?.img ? query.icon : query.icon,
                width: (query.size || initialSize) / 1.5,
                height: (query.size || initialSize) / 1.5,
                zIndex: 999,
              },
              style: {
                stroke: query.color,
              },
            });
          });
        } else {
          const nodes = graph.getNodes().filter((node) => node.getModel().nodeType === query.id);
          const removedNodes = nodes.filter((node) => !filteredNodes.find((child) => child.getID() === node.getID()));
          removedNodes.forEach((node) => {
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
        }

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
