import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { MenuText } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';
import { getRowData } from '../../../data-sheet/components/table-section/node/utils';
import { useGetNode } from 'api/node/use-get-node';
import { Drawer } from 'components/drawer/node-drawer/view-node-drawer';
import { COLORS } from "helpers/constants";

export const NodeView = () => {
  const { nodes, openNode, finishOpenNode } = useGraph() ?? {};

  const node = nodes?.find((n) => n?.id === openNode?.id);

  const { data } = useGetNode(node?.id ?? '', { enabled: !!node?.id });

  return (
    <Drawer
      headerStyle={{
        borderTop: `6px solid ${node?.nodeType.color}`,
      }}
      onClose={finishOpenNode}
      title={<MenuText strong>{node?.name}</MenuText>}
      open={openNode?.isOpened}
    >
      <VerticalSpace>
        {data?.properties ? (
          data.properties.map((d) => {
            return (
              <VerticalSpace key={d.id}>
                <div color={COLORS.PRIMARY.BLUE}>{d.nodeTypeProperty.name}</div>
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
