import { useCallback } from 'react';
import { Col, List, Row, Skeleton, Spin } from 'antd';
import { AllDataPageParameters } from 'api/types';
import { Checkbox } from 'components/checkbox';
import { NodePagination } from 'components/pagination';
import { SecondaryText, Text } from 'components/typography';
import { COLORS, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'helpers/constants';
import styled from 'styled-components';
import { AllDataDocumentResponse } from 'types/node';
import { defaultAllDataFilter } from '../right-section-all-data';
import { Button } from 'components/button';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { AllDataListNode } from './list-node';
import { useGetProjectAllDocuments } from 'api/all-data/use-get-project-all-documents';
import { MarkedText } from 'components/typography/marked-text';
import { Icon } from 'components/icon';

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
  setFilterValue: (
    filter: typeof defaultAllDataFilter | ((prevVar: typeof defaultAllDataFilter) => typeof defaultAllDataFilter)
  ) => void;
};

export const AllDataListDocument = ({ filterValue, setFilterValue, checkedItems, setCheckedItems }: Props) => {
  const { dispatch } = useViewDatasheet();

  const handleItemClick = useCallback(
    (item: AllDataDocumentResponse) => {
      const updatedCheckedItems = checkedItems.includes(item.type_id)
        ? checkedItems.filter((i) => i !== item.type_id)
        : [...checkedItems, item.type_id];
      setCheckedItems(updatedCheckedItems);
    },
    [checkedItems, setCheckedItems]
  );

  const {
    rowsData,
    count: pageCount,
    isInitialLoading,
  } = useGetProjectAllDocuments(filterValue, {
    enabled: !!(filterValue.project_type_list_id && filterValue.type === 'document'),
  });

  return (
    <Spin spinning={isInitialLoading}>
      {filterValue.type === 'node' && (
        <AllDataListNode
          setFilterValue={setFilterValue}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          filterValue={filterValue}
        />
      )}
      {filterValue.type === 'document' && (
        <List
          pagination={false}
          dataSource={rowsData}
          renderItem={(item, index) => {
            return (
              <StyledListItem key={item.type_id} color={item.color}>
                <Checkbox
                  className="all-data-checkbox"
                  style={{ marginRight: '16px' }}
                  checked={checkedItems.includes(item.type_id)}
                  onClick={() => handleItemClick(item)}
                />
                <List.Item.Meta
                  // avatar={<Avatar src={item.default_image} />}
                  title={
                    <Row>
                      <Col span={6} style={{ textAlign: 'center' }}>
                        <Button onClick={() => dispatch(item.type_id)} type="link">
                          <Text color={COLORS.PRIMARY.GRAY} underline>
                            {item.property_name}
                          </Text>
                        </Button>
                      </Col>
                      <Col span={18}>
                        <Row justify="end" align="middle" gutter={32}>
                          <Col span={8}>
                            <Button
                              block
                              type="link"
                              onClick={() => {
                                window.open(item.path, '_blank');
                              }}
                              icon={<Icon color="red" icon="file1" size={16} />}
                            >
                              <SecondaryText ellipsis>
                                <span dangerouslySetInnerHTML={{ __html: item.match_filename }} />
                              </SecondaryText>
                            </Button>
                          </Col>
                          <Col xs={7} xxl={8}>
                            <MarkedText longText={item.match_content} searchTerm={filterValue.search || ''} />
                          </Col>
                          <Col xs={3} xxl={2}>
                            <Text color={COLORS.PRIMARY.GRAY}>({item.match_count})</Text>
                          </Col>
                          <Col span={6}>
                            <TypeInfo color={item.color} className="all-data-type-name">
                              <Text color={COLORS.PRIMARY.GRAY_DARK}>{item.type_name}</Text>
                            </TypeInfo>
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
      )}
      {pageCount ? (
        <NodePagination
          total={pageCount}
          defaultPageSize={initPageData.size}
          pageSize={filterValue.size}
          defaultCurrent={initPageData.page}
          current={filterValue.page}
          onChange={(page) => {
            setFilterValue((prev) => ({ ...prev, page }));
          }}
          showSizeChanger
          onShowSizeChange={(current, size) => {
            setFilterValue((prev) => ({ ...prev, page: current, size: size }));
          }}
        />
      ) : (
        isInitialLoading && <Skeleton />
      )}
    </Spin>
  );
};
