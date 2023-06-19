import { VerticalSpace } from 'components/space/vertical-space';
import { AllDataFilterSection } from './all-data/filter-section';
import { AllDataList } from './all-data/list';

export const RightSectionAllData = () => {
  return (
    <VerticalSpace>
      <AllDataFilterSection />
      <AllDataList />
    </VerticalSpace>
  );
};
