import { WarningFilled } from '@ant-design/icons';
import { Button } from 'components/button';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { useState } from 'react';

type Props = {
  count?: number;
  onClose: () => void;
};

export const ImportMappingIgnoreErrorsModal = ({ count, onClose }: Props) => {
  const [open, setOpen] = useState(false);

  const ignoreRows = async () => {
    setOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        title={
          <VerticalSpace>
            <WarningFilled style={{ color: COLORS.SECONDARY.YELLOW }} />
            <Text style={{ textAlign: 'center' }}>The property is required</Text>
          </VerticalSpace>
        }
        open={open}
        footer={false}
        closable={false}
        className="project-modal"
      >
        <VerticalSpace>
          <Text color={COLORS.PRIMARY.GRAY}>
            {`Property type mismatch. The system has detected inconsistencies in the property type and is unable to
            proceed. As a result, ${count} rows will be deleted from the dataset.`}
          </Text>
          <Button block onClick={ignoreRows} type="primary">
            Continue
          </Button>
          <Button
            block
            type="default"
            onClick={() => {
              setOpen(false);
              onClose();
            }}
          >
            Cancel
          </Button>
        </VerticalSpace>
      </Modal>
      <Button type="primary" onClick={() => setOpen(true)}>
        Ignore Errors
      </Button>
    </>
  );
};
