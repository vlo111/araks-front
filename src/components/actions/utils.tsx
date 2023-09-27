import { errorMessage } from 'helpers/utils';
export async function DownloadFile(nodeTypeId: string, isPDF = false, token: string, nodeId?: string) {
  try {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}`;
    const nodeTypeIdQuery = `nodeTypeId=${nodeTypeId}`;
    const nodeIdQuery = `nodeId=${nodeId}`;
    const excelEndpoint = `${baseUrl}projects-node-types/export-excel/${nodeTypeId}`;
    const pdfEndpoint = `${baseUrl}nodes/export-pdf/${nodeId}`;
    const excelFileURL = `${excelEndpoint}?${nodeTypeIdQuery}`;
    const pdfFileURL = `${pdfEndpoint}?${nodeIdQuery}`;
    const url = nodeId ? pdfFileURL : excelFileURL;
    const headers = {
      'Content-Type': isPDF ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Authorization: token,
    };
    const response = await fetch(url, { method: 'GET', headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const blob = await response.blob();
    const fileUrl = window.URL.createObjectURL(blob);
    window.open(fileUrl);
  } catch (error) {
    errorMessage(error);
  }
}
