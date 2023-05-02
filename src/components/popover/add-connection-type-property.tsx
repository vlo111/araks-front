import { PopoverProps } from 'antd';
import { AddConnectionTypePropertyForm } from 'components/form/add-connection-type-property-form';
import { AddNodeTypePopover } from 'components/popover';
import { Title } from 'components/typography';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';

type Props = PopoverProps;

export const AddConnectionTypeProprty = ({ children, ...props }: Props) => {
  const {
    state: { addConnectionTypeisOpened },
  } = useTypeProperty();

  return (
    <>
      {addConnectionTypeisOpened && (
        <>
          <AddNodeTypePopover
            content={<AddConnectionTypePropertyForm />}
            open={addConnectionTypeisOpened}
            trigger="click"
            {...props}
          >
            <Title level={3}>New Property</Title>
          </AddNodeTypePopover>
          {children}
        </>
      )}
    </>
  );
};
