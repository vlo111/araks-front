import { Col, Row } from 'antd';
import { Sort } from 'components/dropdown';
import { ALL_DATA_SORT_BY } from 'components/dropdown/constants';
import { ExpandableInput, SearchText } from 'components/input/expandable-input';
import { DeleteAllDataModal } from 'components/modal/delete-all-data-modal';
import { useSort } from 'context/sort-context';
import { DEFAULT_PAGE_NUMBER } from 'helpers/constants';
import { useIsPublicPage } from 'hooks/use-is-public-page';
import { useCallback, useEffect } from 'react';
import { defaultAllDataFilter } from '../right-section-all-data';

type Props = {
  checkedItems: string[];
  setCheckedItems: (checkedItems: string[]) => void;
  setFilterValue: (
    filter: typeof defaultAllDataFilter | ((prevVar: typeof defaultAllDataFilter) => typeof defaultAllDataFilter)
  ) => void;
};

export const AllDataFilterSection = ({ setFilterValue, checkedItems, setCheckedItems }: Props) => {
  // const { setHideLeftSection, hideLeftSection } = useOverview();

  const { state: sortState } = useSort();
  const isPublicPage = useIsPublicPage();

  const setSearchText = useCallback(
    ({ text, type }: SearchText) => {
      setFilterValue((prevValue) => ({
        ...prevValue,
        search: text,
        type,
        page: DEFAULT_PAGE_NUMBER,
        ...(isPublicPage && type === 'document' ? { isPublic: true } : {}),
      }));
    },
    [isPublicPage, setFilterValue]
  );

  useEffect(() => {
    const [orderName, order] = sortState?.split(' ') || [];

    if (orderName && order) {
      setFilterValue((prev) => ({
        ...prev,
        sortField: orderName,
        sortOrder: order,
      }));
    }
  }, [setFilterValue, sortState]);

  return (
    <Row justify="space-between" style={{ padding: '24px 32px 32px 24px' }}>
      <Col span={16}>
        <Row gutter={24}>
          <Col span={8}>
            <Sort prefix="Sort By:" sortItems={ALL_DATA_SORT_BY} fullWidth />
          </Col>
          <Col span={14}>
            <ExpandableInput setSearchText={setSearchText} />
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <Row justify="end">
          <Col>
            <DeleteAllDataModal checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
          </Col>
        </Row>
      </Col>
      {/*<Col>*/}
      {/*  <DownloadAction />*/}
      {/*</Col>*/}
      {/*{!hideLeftSection && (*/}
      {/*  <Col>*/}
      {/*    <Button type="primary" block onClick={() => setHideLeftSection((prev) => !prev)}>*/}
      {/*      Queries*/}
      {/*    </Button>*/}
      {/*  </Col>*/}
      {/*)}*/}
    </Row>
  );
};
