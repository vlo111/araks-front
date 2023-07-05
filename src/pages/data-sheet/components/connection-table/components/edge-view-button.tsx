import { Button } from 'components/button';
import { MenuText } from 'components/typography';
import { useViewDatasheetEdge } from 'context/datasheet-edge-view-vontext';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { ETypeEdgeData } from 'types/edges';

type Props = {
  text: string;
  rowData?: ETypeEdgeData;
};

const CedllName = styled(MenuText)`
  font-size: 20px;
  font-family: Rajdhani;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.4px !important;
  text-decoration-line: underline;
`;

export const EdgeViewButton = ({ text, rowData }: Props) => {
  const { dispatch } = useViewDatasheetEdge();

  return (
    <>
      <Button type="link" className="table-row-height" onClick={() => dispatch(rowData)}>
        <CedllName underline color={COLORS.PRIMARY.BLUE}>
          {text}
        </CedllName>
      </Button>
    </>
  );
};
