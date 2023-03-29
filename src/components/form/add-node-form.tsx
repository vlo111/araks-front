import { Form, Skeleton } from 'antd';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';

export const AddNodeForm = () => {
  const [form] = Form.useForm();
  const { nodeTypeId } = useDataSheetWrapper();
  const { data, isLoading } = useGetProjectNodeTypeProperties(nodeTypeId, { enabled: !!nodeTypeId });
  // eslint-disable-next-line no-console
  console.log('dataatatata', data);

  const onFinish = () => {
    return;
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Form
      name="project-node"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
    >

      
    </Form>
  );
};
