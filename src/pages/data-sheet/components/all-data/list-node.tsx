import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { Avatar, Col, List, Row, Skeleton, Spin } from 'antd';
import { useGetProjectAllData } from 'api/all-data/use-get-project-all-data';
import { UserProjectRole } from 'api/types';
import { Checkbox } from 'components/checkbox';
import { NodePagination } from 'components/pagination';
import { Text } from 'components/typography';
import dayjs from 'dayjs';
import { COLORS, initPageData } from 'helpers/constants';
import styled from 'styled-components';
import { AllDataResponse } from 'types/node';
import { defaultAllDataFilter } from '../right-section-all-data';
import { Button } from 'components/button';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { useProject } from 'context/project-context';
import { useParams } from 'react-router-dom';
import { useIsXXlScreen } from 'hooks/use-breakpoint';
import { useIsPublicPage } from 'hooks/use-is-public-page';

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

    .ant-list-item-meta {
      align-items: center;
    }
  }
`;

type Props = {
  filterValue: typeof defaultAllDataFilter;
  checkedItems: string[];
  setCheckedItems: (values: string[]) => void;
  setIsAllCheck: Dispatch<SetStateAction<boolean>>;
  isAllCheck: boolean;
  setFilterValue: (
    filter: typeof defaultAllDataFilter | ((prevVar: typeof defaultAllDataFilter) => typeof defaultAllDataFilter)
  ) => void;
};

export const AllDataListNode = ({
  filterValue,
  setFilterValue,
  checkedItems,
  setCheckedItems,
  isAllCheck,
  setIsAllCheck,
}: Props) => {
  const params = useParams();
  const { dispatch } = useViewDatasheet();
  const { projectInfo } = useProject();
  const isXXl = useIsXXlScreen();
  const isPublicPage = useIsPublicPage();

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
  } = useGetProjectAllData(filterValue, {
    enabled: !!(filterValue.project_type_list_id && filterValue.type === 'node'),
    onSuccess: (data) => {
      if (params.node_type_id) {
        dispatch(params.node_type_id);
      }
    },
  });

  useEffect(() => {
    setCheckedItems(isAllCheck ? rowsData.map((r) => r.id) : []);
  }, [isAllCheck, rowsData, setCheckedItems]);

  useEffect(() => {
    setIsAllCheck(false);
  }, [filterValue, setIsAllCheck]);

  return (
    <Spin spinning={isInitialLoading}>
      {projectInfo?.role !== UserProjectRole.Viewer && !isPublicPage && (
        <div style={{ margin: '1rem 1.5rem', position: 'absolute', top: -60 }}>
          <Checkbox
            id="allCheck"
            className="all-data-checkbox"
            style={{ marginRight: '16px' }}
            checked={isAllCheck}
            onChange={() => {
              setIsAllCheck(!isAllCheck);
            }}
          />
          <label
            htmlFor="allCheck"
            style={{
              cursor: 'pointer',
              color: '#808080',
              fontWeight: '600',
              letterSpacing: '1.4px',
            }}
          >
            All Nodes
          </label>
        </div>
      )}
      <List
        style={{ overflow: 'auto', height: `calc(100vh - ${(isXXl ? 152 : 130) + 232}px)` }}
        pagination={false}
        dataSource={rowsData}
        renderItem={(item, index) => {
          return (
            <StyledListItem key={item.id} color={item.nodeType?.color}>
              {projectInfo?.role !== UserProjectRole.Viewer && !isPublicPage && (
                <Checkbox
                  className="all-data-checkbox"
                  style={{ marginRight: '16px' }}
                  checked={checkedItems.includes(item.id)}
                  onClick={() => handleItemClick(item)}
                />
              )}
              <List.Item.Meta
                avatar={<Avatar src={`${process.env.REACT_APP_AWS_URL}${item.default_image}`} />}
                title={
                  <Row align="middle">
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
                        <Col span={6}>
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
