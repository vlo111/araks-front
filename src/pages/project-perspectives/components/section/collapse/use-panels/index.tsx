import { ReactNode, useEffect, useState } from 'react';
import { Extra } from './extra';
import { FooterPanel } from './footer';
import { ResponsePerspectiveData } from 'api/perspective/use-get-perspectives';

export type PanelList = {
  children: ReactNode;
  extra: ReactNode | undefined;
  header: ReactNode;
  key: string;
}[];

export const usePanels = (panels: ResponsePerspectiveData[]) => {
  const [list, setList] = useState<PanelList>([]);

  useEffect(() => {
    const items: PanelList = panels?.map((item, index) => ({
      key: `${item.id}`,
      header: <div>{item.title}</div>,
      extra: item.status !== 'main' ? <Extra id={`${item.id}`} /> : undefined,
      children: <FooterPanel description={item.description} shared={item.shared.length} />,
    }));

    setList(items);
  }, [panels]);

  return { list };
};
