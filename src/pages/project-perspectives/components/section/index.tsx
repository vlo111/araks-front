import { Header } from './header';
import { PerspectiveWrapper } from './style';
import { Content } from './content/collapse';
import { list } from './fake-data';

export const Section = () => {

  return (
    <PerspectiveWrapper>
      <Header />
      <Content panels={list} />
    </PerspectiveWrapper>
  );
};
