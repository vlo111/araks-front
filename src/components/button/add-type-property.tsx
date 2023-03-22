import { PopoverProps } from 'antd';
import { PlusAction } from 'components/actions/plus';
import { AddTypePropertyForm } from 'components/form/add-type-property-form';
import { AddNodeTypePopover } from 'components/popover';
import { Title } from 'components/typography';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { useCallback } from 'react';

type Props = PopoverProps & {};

export const AddTypeProprty = ({ children, ...props }: Props) => {
  const {
    state: { titleText, addTypeisOpened },
    dispatch,
  } = useTypeProperty();

  const handlePropertyAddClick = useCallback(() => {
    dispatch({ type: TypePropertyActionKind.ADD_TYPE_START, payload: {} });
  }, [dispatch]);

  return (
    <>
      <AddNodeTypePopover content={<AddTypePropertyForm />} open={addTypeisOpened} trigger="click" {...props}>
        {!titleText && <PlusAction button={{ style: { width: '20px' }, onClick: handlePropertyAddClick }} />}
        {titleText && <Title level={3}>{titleText}</Title>}
      </AddNodeTypePopover>
      {children}
    </>
  );
};
