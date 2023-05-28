import styled from 'styled-components';
import { COLORS } from 'helpers/constants';
import { Text } from 'components/typography';
import { ReactComponent as AddSvg } from './icons/add.svg';
import { ReactComponent as DuplicateSvg } from './icons/duplicate.svg';

const PerspectivePanelStyle = styled.div`
  display: flex;
  gap: 12px;
  position: fixed;
  right: 0;
  top: 152px;
  width: 600px;
  height: 100%;
  padding: 2rem;
  background: linear-gradient(122.32deg, rgba(237, 239, 248, 0.9) 3.09%, rgba(237, 239, 248, 0.4) 99.26%),
    linear-gradient(0deg, ${COLORS.PRIMARY.WHITE}, ${COLORS.PRIMARY.WHITE});
  box-shadow: 0px 10px 10px 0px #8d8fa633;
  border: 1px solid ${COLORS.PRIMARY.WHITE};
  z-index: 1;
`;

export const Perspectives = () => {
  return (
    <PerspectivePanelStyle>
      <Text style={{ fontSize: '20px' }}>Perspectives</Text>
      <AddSvg />
      <DuplicateSvg />
    </PerspectivePanelStyle>
  );
};
