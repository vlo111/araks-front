import { useState } from 'react';
import type { CollapseProps } from 'antd';
import { Form } from 'antd';
import { useNodes } from 'hooks/use-nodes';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { QueriesForm } from 'components/form/all-data/queries-form';
import { NodePropertiesValues } from 'types/node';
import { Buttons } from '../buttons';
import { StyledMainWrapper, StyledCollape } from './styles';

type Props = {
  queries: Array<NodePropertiesValues & {color:string,size: number,icon:string}>;
}

export const Styling = () => {
  const { nodes } = useNodes();
  const { graph } = useGraph() ?? {};
  const form = Form.useFormInstance();
  const [openTable, setOpenTable] = useState(true);

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Select',
      children: <QueriesForm openTable={openTable} setOpenTable={setOpenTable} isVisualisation={true} />,
    },
  ];
  const onFinish = (values: Props) => {
    // eslint-disable-next-line no-console
    nodes.forEach(node => {
      for (const query of values.queries) {
        if (node.project_type_id === query.id) {
          graph.updateItem(node.id, {
            size: query.size,
            icon: query.icon,
            style: {
              stroke: query.color
            }
          })
        }
      }
    })
  };

  return (
    <Form form={form} onFinish={onFinish} style={{height: "100%"}}>
      <StyledMainWrapper>
        <StyledCollape items={items} />
        <Buttons setOpenTable={setOpenTable}  />
      </StyledMainWrapper>
    </Form>
  );
};
