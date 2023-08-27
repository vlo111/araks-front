import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { UploadedFileType } from 'types/node';

type Props = {
  node: UploadedFileType;
};

export const DocumentView = ({ node }: Props) => {
  return <DocViewer documents={[{ uri: node.url }]} pluginRenderers={DocViewerRenderers} />;
};
