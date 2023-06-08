import { Header } from './header';
import { Collapse } from './collapse';
import { useParams } from 'react-router-dom';
import { useGetPerspectives } from 'api/perspective/use-get-perspectives';
import { useMemo } from 'react';
import { Wrapper } from './style';
import { Share } from './share';

export const Section = () => {
  const params = useParams();

  const { data } = useGetPerspectives({ id: params.id }, { enabled: !!params.id });

  const panels = useMemo(() => (data?.length ? data : []), [data]);

  return (
    <Wrapper>
      <Header />
      <Collapse panels={panels} />
      <Share />
    </Wrapper>
  );
};
