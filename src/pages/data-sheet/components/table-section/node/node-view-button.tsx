import { Button } from 'components/button';
import { MenuText } from 'components/typography';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { NodeDataResponse } from 'types/node';

type Props = {
  text: string;
  rowData?: NodeDataResponse;
};

const CedllName = styled(MenuText)`
  font-size: 20px;
  font-family: Rajdhani;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.4px !important;
  text-decoration-line: underline;
`;

export const NodeViewButton = ({ text, rowData }: Props) => {
  const { dispatch } = useViewDatasheet();

  return (
    <>
      <Button type="link" className="table-row-height" onClick={() => dispatch(rowData?.id || '')}>
        <CedllName underline color={COLORS.PRIMARY.BLUE}>
          {text}
        </CedllName>
      </Button>
    </>
  );
};
