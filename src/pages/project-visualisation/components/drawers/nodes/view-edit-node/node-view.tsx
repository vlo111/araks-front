import { Text } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';
import { getRowData } from '../../../../../data-sheet/components/table-section/node/utils';
import { COLORS } from 'helpers/constants';
import { Image } from 'antd';
import { NodeDataResponse } from 'types/node';

export const ViewNode = ({ nodeData }: { nodeData: NodeDataResponse | undefined }) => {
  return (
    <VerticalSpace>
      {nodeData?.default_image && (
        <Image src={nodeData?.default_image} width={161} height={127} style={{ borderRadius: '4px' }} />
      )}
      <VerticalSpace>
        <Text color={COLORS.PRIMARY.BLUE}>name</Text>
        <Text>{nodeData?.name}</Text>
      </VerticalSpace>
      {nodeData?.properties ? (
        nodeData.properties.map((d) => {
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
  );
};
