import type { CollapseProps } from 'antd';
import { QueriesForm } from '../../../../components/form/all-data/queries-form';
import { StyledMainWrapper, StyledCollape } from './styles';
import { useState } from 'react';



export const Styling = () => {
  const [openTable, setOpenTable] = useState(true);

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Select',
      children: <QueriesForm openTable={openTable} setOpenTable={setOpenTable} isVisualisation={true} />,
    },
  ];

  return (
    <StyledMainWrapper>
      <StyledCollape items={items} />
    </StyledMainWrapper>
  );
};
