import { CloseOutlined } from '@ant-design/icons';
import { Form, Space } from 'antd';
import { useGetComments } from 'api/comments/use-get-comments';
import { useGetNodeComments } from 'api/comments/use-get-node-comments';
import { SecondaryText } from 'components/typography';
import { ShowSafeText } from 'components/typography/show-safe-text';

type Props = {
  nodeId?: string;
};

export const ReplayText = ({ nodeId }: Props) => {
  const { rowsData } = useGetComments(!nodeId);
  const { rowsData: nodesRowsData } = useGetNodeComments(nodeId as string);

  const form = Form.useFormInstance();

  const parentId = Form.useWatch('parent_id', { preserve: true });

  if (!parentId) {
    return <></>;
  }

  return (
    <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SecondaryText>
        <ShowSafeText
          text={(nodeId ? nodesRowsData : rowsData).find((item) => item.id === parentId)?.comments as string}
        />
      </SecondaryText>
      <CloseOutlined onClick={() => form.setFieldValue('parent_id', null)} style={{ fontSize: '12px' }} />
    </Space>
  );
};
