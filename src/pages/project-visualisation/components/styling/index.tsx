import { useState } from 'react';
import { Form } from 'antd';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { QueriesForm } from 'components/form/all-data/queries-form';
import {AllDataResponse, NodePropertiesValues} from 'types/node';
import { Buttons } from '../buttons';
import { StyledMainWrapper } from './styles';

type Props = {
  queries: Array<NodePropertiesValues & { color: string; size: number; icon: string }>;
};

export const Styling = () => {
  const { graph, nodes } = useGraph() ?? {};
  const [form] = Form.useForm();
  const [filteredNodes, setFilteredNodes] = useState<AllDataResponse[]>([]);
  const [openTable, setOpenTable] = useState(true);
  const initialSize = 40;

  const onFinish = (values: Props) => {
    if (values.queries) {
      values.queries.forEach(query => {
        const filteredNodes = nodes.filter(node => node.project_type_id === query.id);
        setFilteredNodes(prevState => [...prevState, ...filteredNodes]);
        filteredNodes.forEach(node => {
          graph.updateItem(node.id, {
            size: query.size || initialSize,
            type: query.icon ? query.icon : "circle",
            icon: {
              show: !!query.icon,
              img: query.icon,
              width: query.size / 1.5,
              height: query.size / 1.5,
            },
            style: {
              stroke: query.color,
            },
          });
        });
      });
    }
  }

  return (
    <Form form={form} name='styling' onFinish={onFinish} style={{ height: '100%' }}>
      <StyledMainWrapper>
        <QueriesForm openTable={openTable} setOpenTable={setOpenTable} isVisualisation={true} />
        <Buttons setOpenTable={setOpenTable} filteredNodes={filteredNodes} resetFields={form?.resetFields} />
      </StyledMainWrapper>
    </Form>
  );
};
