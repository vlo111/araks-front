import { Header } from './header';
import { Content } from './collapse';
import { list } from './fake-data';

export const Section = () => {

  return (
    <>
      <Header />
      <Content panels={list} />
    </>
  );
};
