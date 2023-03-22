import { Space } from 'antd';

import { ViewProvider } from 'context/view-context';
import { SortProvider } from 'context/sort-context';
import { PROJECT_SORT, Sort, Template } from 'components/dropdown';
import { View } from 'components/view';
import { VerticalSpace } from 'components/space/vertical-space';

type Props = {
  children: React.ReactNode;
};

export const ProjectList = ({ children }: Props) => {
  return (
    <ViewProvider>
      <SortProvider defaultValue={PROJECT_SORT[0].key}>
        <VerticalSpace size="large">
          <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Template />
            <Space size="middle">
              <Sort sortItems={PROJECT_SORT} />
              <View />
            </Space>
          </Space>
          {children}
        </VerticalSpace>
      </SortProvider>
    </ViewProvider>
  );
};
