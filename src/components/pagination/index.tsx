import { Pagination, PaginationProps } from 'antd';
import { MenuText } from 'components/typography';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';

const PaginationStyle = styled(Pagination)`
  & {
    display: flex;
    justify-content: end;
    padding: 48px 24px 24px;

    .ant-pagination-prev,
    .ant-pagination-next {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgba(219, 219, 219, 0.38);
      pointer: cursor;
    }
  }
`;

export const NodePagination = (props: PaginationProps) => {
  return (
    <PaginationStyle
      showTotal={(total, range) => (
        <>
          <MenuText strong color={COLORS.PRIMARY.BLUE}>{`${range[0]}-${range[1]}`}</MenuText>
          <MenuText color={COLORS.PRIMARY.BLUE}>{` of ${total}`}</MenuText>
        </>
      )}
      {...props}
    />
  );
};
