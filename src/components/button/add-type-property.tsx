import { PopoverProps } from 'antd';
import { AddTypePropertyForm } from 'components/form/add-type-property-form';
import { AddNodeTypePopover } from 'components/popover';
import { Title } from 'components/typography';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';

type Props = PopoverProps;

export const AddTypeProprty = ({ children, ...props }: Props) => {
  const {
    state: { addTypeisOpened },
  } = useTypeProperty();

  return (
    <>
      {addTypeisOpened && (
        <>
          <AddNodeTypePopover content={<AddTypePropertyForm />} open={addTypeisOpened} trigger="click" {...props}>
            <Title level={3}>New Property</Title>
          </AddNodeTypePopover>
          {children}
        </>
      )}
    </>
  );
};
