import { Button } from 'components/button';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { NodeDataResponse } from 'types/node';

type Props = {
  text: string;
  rowData?: NodeDataResponse;
};

export const NodeViewButton = ({ text, rowData }: Props) => {
  const { dispatch } = useViewDatasheet();

  return (
    <>
      <Button type="link" className="table-row-height" onClick={() => dispatch(rowData)}>
        {text}
      </Button>
    </>
  );
};
