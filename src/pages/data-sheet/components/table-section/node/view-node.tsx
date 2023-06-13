import { Text } from 'components/typography';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { COLORS } from 'helpers/constants';
import { VerticalSpace } from './../../../../../components/space/vertical-space';
import { getRowData } from './utils';

export const VIewNode = () => {
  const { state: selectedView } = useViewDatasheet();
  return (
    <VerticalSpace>
      {selectedView?.properties ? (
        selectedView.properties.map((data) => {
          return (
            <VerticalSpace key={data.id}>
              <Text color={COLORS.PRIMARY.BLUE}>{data.nodeType.name}</Text>
              {getRowData(data)}
            </VerticalSpace>
          );
        })
      ) : (
        <></>
      )}
    </VerticalSpace>
  );
};
