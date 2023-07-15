import { Modal } from 'antd';
import { ImportActionType, useImport } from 'context/import-context';
import { Button } from '.';

type Props = {
  type: ImportActionType;
  name: string;
};

/**
 * Component should be used inside ImportProvider
 * @returns
 */
export const ImportCancelButton = ({ type, name }: Props) => {
  const { dispatch } = useImport();

  return (
    <Button
      type="default"
      block
      onClick={() => {
        Modal.confirm({
          title: 'Are you sure you want to cancel current import process? All data will be cleared.',
          //   content: (
          //     <VerticalSpace>
          //       <Button type="primary" onClick={}>
          //         Confirm
          //       </Button>
          //       <Button type="default">Cancel</Button>
          //     </VerticalSpace>
          //   ),
          onOk: () => dispatch({ type, payload: {} }),
          //   footer: null,
        });
      }}
    >
      {name}
    </Button>
  );
};
