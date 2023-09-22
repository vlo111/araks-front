export async function DownloadFile(nodeTypeId: string, isPDF = false, token: string) {
  try {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}`;
    const queryParams = `?nodeTypeId=${nodeTypeId}`;
    const url = `${baseUrl}nodes/export-nodes/${nodeTypeId}`;
    const excelFileURL = `${url}?${queryParams}`;

    const headers = {
      'Content-Type': isPDF ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Authorization: token,
    };

    const response = await fetch(excelFileURL, { method: 'GET', headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const blob = await response.blob();
    const fileUrl = window.URL.createObjectURL(blob);
    window.open(fileUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error downloading file:', error);
  }
};
