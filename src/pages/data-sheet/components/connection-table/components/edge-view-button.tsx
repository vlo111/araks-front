import { UserProjectRole } from 'api/types';
import { Button } from 'components/button';
import { MenuText } from 'components/typography';
import { useViewDatasheetEdge } from 'context/datasheet-edge-view-vontext';
import { useProject } from 'context/project-context';
import { COLORS } from 'helpers/constants';
import { useIsPublicPage } from 'hooks/use-is-public-page';
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
  const isPublicPage = useIsPublicPage();
  const { projectInfo } = useProject();

  // eslint-disable-next-line no-console
  console.log('projectInfo', projectInfo);
  return (
    <>
      <Button
        type="link"
        className="table-row-height"
        onClick={() => dispatch(rowData)}
        disabled={isPublicPage || projectInfo?.role === UserProjectRole.Viewer}
      >
        <CedllName underline color={COLORS.PRIMARY.BLUE}>
          {text}
        </CedllName>
      </Button>
    </>
  );
};
