import { UploadedFileType } from 'types/node';
import DocViewer from '@cyntler/react-doc-viewer';
import { DocViewerRenderers } from '@cyntler/react-doc-viewer/dist/esm/renderers';
import { COLORS } from 'helpers/constants';

type Props = {
  node: UploadedFileType;
};

const headers = {
  responseType: 'blob',
};

const config = {
  header: {
    disableHeader: true,
    disableFileName: false,
    retainURLParams: false,
  },
};

const theme = {
  primary: COLORS.PRIMARY.GRAY,
  secondary: COLORS.PRIMARY.BLUE,
  tertiary: COLORS.PRIMARY.GRAY_LIGHT,
  textPrimary: COLORS.PRIMARY.BLUE,
  textSecondary: COLORS.PRIMARY.GRAY,
  textTertiary: '#00000099',
  disableThemeScrollbar: false,
};

export const DocumentView = ({ node }: Props) => {
  const docs = [{ uri: `${process.env.REACT_APP_AWS_URL}${node.url}`, fileName: node.name }];

  return (
    <DocViewer
      documents={docs}
      config={config}
      pluginRenderers={DocViewerRenderers}
      prefetchMethod="GET"
      requestHeaders={headers}
      theme={theme}
    />
  );
};
