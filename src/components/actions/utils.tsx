export const downloadFile = async (nodeTypeId: string, isPdf = false) => {
  try {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}`;
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZXhhbXBsZUBlbWFpbC5jb20iLCJ1c2VySWQiOiI0ZjBkYmM2MC1jNmRiLTQzZWItOWE4MS0zMDZlMDVmMzJiMzMiLCJhY2Nlc3NUeXBlcyI6WyJhZG1pbiJdLCJ1c2VyX2lwIjoiOjpmZmZmOjE5Mi4xNjguMC4xNDEiLCJpYXQiOjE2OTUzNzUyNTUsImV4cCI6MTY5NTQ4MzI1NX0.JzxkmsHejTg4ZxJpfC7LYGjMTLfKrahpaTDi9zuStjE'; // Replace with your actual token
    const queryParams = `?nodeTypeId=${nodeTypeId}`;
    const url = `${baseUrl}nodes/export-nodes/${nodeTypeId}`;
    const excelFileURL = `${url}?${queryParams}`;

    const headers = {
      'Content-Type': isPdf ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
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
    console.error('Error downloading file:', error);
  }
};
