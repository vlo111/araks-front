import { Avatar, List } from 'antd';
import { useGetProjectAllData } from 'api/all-data/use-get-project-all-data';
import { PageParameters } from 'api/types';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'helpers/constants';
import { useState } from 'react';
import { NodePropertiesValues } from 'types/node';

const initPageData: PageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const AllDataList = () => {
  const [pageData, setPageData] = useState(initPageData);
  // eslint-disable-next-line no-console
  console.log('setPageData', setPageData);

  const { rowsData } = useGetProjectAllData(pageData);
  return (
    <List
      pagination={{ position: 'bottom', align: 'end' }}
      dataSource={rowsData}
      renderItem={(item, index) => {
        const [avatar, name] = item.properties as NodePropertiesValues[];
        return (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={avatar?.nodes_data?.join('')} />}
              title={<a href="https://ant.design">{name?.nodes_data?.join('')}</a>}
            />
          </List.Item>
        );
      }}
    />
  );
};
