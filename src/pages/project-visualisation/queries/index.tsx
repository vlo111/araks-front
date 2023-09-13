import { StyledMainWrapper } from './styles';
import { QueriesButton } from '../../../components/button/queries-button';

export const Queries = () => {
  return (
    <>
      <StyledMainWrapper>
        <QueriesButton isQueries={true} />
      </StyledMainWrapper>
    </>
  );
};
