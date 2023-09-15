import { Modal } from 'components/modal';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { ShortestPathWrapper } from './shortest-path';

export const ShortestPathModal = () => {
  const { openShortestPath } = useGraph() ?? {};

  return (
    <Modal
      centered
      open={openShortestPath?.isOpened}
      footer={false}
      closable={false}
      className="shortest-project-modal"
    >
      <ShortestPathWrapper />
    </Modal>
  );
};
