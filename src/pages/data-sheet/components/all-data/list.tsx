import { useCallback, useEffect, useState } from 'react';
import { Avatar, Col, List, Row, Skeleton } from 'antd';
import { useGetProjectAllData } from 'api/all-data/use-get-project-all-data';
import { AllDataPageParameters } from 'api/types';
import { Checkbox } from 'components/checkbox';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { NodePagination } from 'components/pagination';
import { Text } from 'components/typography';
import { useSort } from 'context/sort-context';
import dayjs from 'dayjs';
import { COLORS, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'helpers/constants';
import styled from 'styled-components';
import { AllDataResponse } from 'types/node';
import { defaultAllDataFilter } from '../right-section-all-data';
import { Button } from 'components/button';
import { useViewDatasheet } from 'context/datasheet-view-vontext';

type TypeInfoProps = {
  color?: string;
};

const TypeInfo = styled(({ color, ...props }) => <div {...props} />)<TypeInfoProps>`
  background-color: ${(props) => `${props.color}15`};
  text-align: center;
  border-radius: 8px;
`;

const StyledListItem = styled(({ color, ...props }) => <List.Item {...props} />)`
  && {
    margin-bottom: 8px;
    padding-left: 24px;
    padding-right: 32px;
    background: linear-gradient(90.12deg, rgba(255, 255, 255, 0.7) 1.63%, rgba(255, 255, 255, 0.2) 100%);

    &:hover {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

      .all-data-type-name {
        background-color: ${(props) => `${props.color}`};
      }
    }
  }
`;

const initPageData: AllDataPageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

type Props = {
  filterValue: typeof defaultAllDataFilter;
  checkedItems: string[];
  setCheckedItems: (values: string[]) => void;
};

export const AllDataList = ({ filterValue, checkedItems, setCheckedItems }: Props) => {
  const { dispatch } = useViewDatasheet();

  const { state } = useSort();
  const { allDataTypesList } = useDataSheetWrapper();
  const [pageData, setPageData] = useState(initPageData);

  const defaultSort = state?.split(' ');

  useEffect(() => {
    setPageData((prev) => ({
      ...prev,
      project_type_list_id: allDataTypesList,
      ...filterValue,
      ...(defaultSort ? { sortOrder: defaultSort[1], sortField: defaultSort[0] } : {}),
    }));
  }, [allDataTypesList, defaultSort, filterValue, state]);

  const handleItemClick = useCallback(
    (item: AllDataResponse) => {
      const updatedCheckedItems = checkedItems.includes(item.id)
        ? checkedItems.filter((i) => i !== item.id)
        : [...checkedItems, item.id];
      setCheckedItems(updatedCheckedItems);
    },
    [checkedItems, setCheckedItems]
  );

  const {
    rowsData,
    count: pageCount,
    isInitialLoading,
  } = useGetProjectAllData(pageData, { enabled: !!pageData.project_type_list_id });

  return (
    <>
      <List
        pagination={false}
        dataSource={rowsData}
        renderItem={(item, index) => {
          return (
            <StyledListItem key={item.id} color={item.nodeType?.color}>
              <Checkbox
                className="all-data-checkbox"
                style={{ marginRight: '16px' }}
                checked={checkedItems.includes(item.id)}
                onClick={() => handleItemClick(item)}
              />
              <List.Item.Meta
                avatar={<Avatar src={item.default_image} />}
                title={
                  <Row>
                    <Col span={6}>
                      <Button onClick={() => dispatch(item.id)} type="link">
                        <Text color={COLORS.PRIMARY.GRAY} underline>
                          {item.name}
                        </Text>
                      </Button>
                    </Col>
                    <Col span={18}>
                      <Row justify="end" align="middle" gutter={32}>
                        <Col offset={6} span={6}>
                          <TypeInfo color={item.nodeType?.color} className="all-data-type-name">
                            <Text color={COLORS.PRIMARY.GRAY_DARK}>{item.nodeType?.name}</Text>
                          </TypeInfo>
                        </Col>
                        <Col>
                          <Text color={COLORS.PRIMARY.GRAY}>
                            {item?.updated_at ? dayjs(item?.updated_at).format('DD MMMM [at] HH:mm') : ''}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                }
              />
            </StyledListItem>
          );
        }}
      />
      {pageCount ? (
        <NodePagination
          total={pageCount}
          defaultPageSize={initPageData.size}
          pageSize={pageData.size}
          defaultCurrent={initPageData.page}
          current={pageData.page}
          onChange={(page) => {
            setPageData((prev) => ({ page, size: prev.size }));
          }}
          showSizeChanger
          onShowSizeChange={(current, size) => {
            setPageData({ page: current, size: size });
          }}
        />
      ) : (
        isInitialLoading && <Skeleton />
      )}
    </>
  );
};
