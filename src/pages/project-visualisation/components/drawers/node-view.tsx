import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { MenuText, Text } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';
import { COLORS } from 'helpers/constants';
import { getRowData } from '../../../data-sheet/components/table-section/node/utils';
import { useGetNode } from 'api/node/use-get-node';
import { Drawer } from 'components/drawer/node-drawer/view-node-drawer';

export const NodeView = () => {
  const { nodes, openNode, finishOpenNode } = useGraph() ?? {};

  const node = nodes?.find((n: { node_id: string }) => n?.node_id === openNode?.id);

  const { data } = useGetNode(node?.node_id ?? '', { enabled: !!node?.node_id });

  return (
    <Drawer
      headerStyle={{
        borderTop: `6px solid ${node?.type_color}`,
      }}
      onClose={finishOpenNode}
      title={<MenuText strong>{node?.node_name}</MenuText>}
      open={openNode?.isOpened}
    >
      <VerticalSpace>
        {data?.properties ? (
          data.properties.map((d) => {
            return (
              <VerticalSpace key={d.id}>
                <Text color={COLORS.PRIMARY.BLUE}>{d.nodeType.name}</Text>
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
