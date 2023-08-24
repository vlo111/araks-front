import { useState } from 'react';
import { Form } from 'antd';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { QueriesForm } from 'components/form/all-data/queries-form';
import { NodePropertiesValues } from 'types/node';
import { Buttons } from '../buttons';
import { StyledMainWrapper } from './styles';

type Props = {
  queries: Array<NodePropertiesValues & { color: string; size: number; icon: string }>;
};

export const Styling = () => {
  const { graph, nodes } = useGraph() ?? {};
  const form = Form.useFormInstance();
  const [openTable, setOpenTable] = useState(true);

  const onFinish = (values: Props) => {
    nodes?.forEach((node) => {
      for (const query of values.queries) {
        if (node.project_type_id === query.id) {
          graph.updateItem(node.id, {
            type: 'circle',
            size: query.size,
            icon: {
              show: true,
              img: query.icon,
              width: query.size / 2,
              height: query.size / 2,
            },
            style: {
              stroke: query.color,
            },
          });
        }
      }
    });
  };

  return (
    <Form form={form} onFinish={onFinish} style={{ height: '100%' }}>
      <StyledMainWrapper>
        <QueriesForm openTable={openTable} setOpenTable={setOpenTable} isVisualisation={true} />
        <Buttons setOpenTable={setOpenTable} />
      </StyledMainWrapper>
    </Form>
  );
};
