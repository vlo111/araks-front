import { Drawer } from 'antd';
import { HorizontalButton } from 'components/button/horizontal-button';
import { AddNodeForm } from 'components/form/add-node-form';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useState } from 'react';

type Props = {
  tableHead: number;
};

export const ManageNode = ({ tableHead }: Props) => {
  const [open, setOpen] = useState(false);
  const { titleText } = useDataSheetWrapper();

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    right: 0,
    top: `${tableHead}px`,
    overflow: 'hidden',
    textAlign: 'center',
    paddingLeft: '64px',
    paddingRight: '64px',
  };
  return (
    <>
      <HorizontalButton tableHead={tableHead} openForm={onOpen} formIsOpened={open} />
      <div style={containerStyle}>
        <Drawer
          title={`Add New Node / ${titleText}`}
          placement="top"
          closable={false}
          onClose={onClose}
          open={open}
          getContainer={false}
          contentWrapperStyle={{ marginRight: '135px', marginLeft: '135px', height: '100%' }}
        >
          <AddNodeForm />
        </Drawer>
      </div>
    </>
  );
};
