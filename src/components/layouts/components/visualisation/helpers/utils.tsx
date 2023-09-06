import client from 'api/client';
import { GetNeo4jData } from 'api/visualisation/use-get-data';
import { ExpandList, ExpandListData } from '../types';

export const getExpandData = async (id: string, project_edge_type_id: string) => {
  const projectId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  const url = `${process.env.REACT_APP_BASE_URL}neo4j/expand/${projectId}`;

  const params = {
    params: {
      id,
      project_edge_type_id,
      direction: 'all',
    },
  };

  const data: GetNeo4jData = await client.get(url, params);

  return data.data;
};

export const getExpandList = async (id: string) => {
  const expandList: ExpandListData | null = await client.get(
    `${process.env.REACT_APP_BASE_URL}neo4j/expand-list/${location.pathname.substring(
      location.pathname.lastIndexOf('/') + 1
    )}`,
    {
      params: { id },
    }
  );

  return expandList?.data.relations;
};

/**
 * Render Context Menu Modal
 * Get expandList from localStorage which is saved from node:mouseenter event
 * @param id
 * @param isNode
 */
export const getMenuContexts = (id: string, isNode: boolean) => {
  const inSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="10" viewBox="0 0 19 10" fill="none">
<path d="M12.5715 5.86591C8.66297 5.86554 4.80196 5.86659 0.940946 5.86344C0.245289 5.86287 -0.0335476 5.56538 0.00318751 4.89674C0.0278186 4.44842 0.256306 4.20441 0.648986 4.14051C0.804023 4.11529 0.964854 4.13061 1.12305 4.1306C5.85437 4.13051 10.5857 4.13081 15.317 4.13105C15.4889 4.13106 15.6609 4.13105 15.8655 4.13105C15.8431 3.87639 15.6811 3.77513 15.5686 3.64989C14.9485 2.95928 14.3111 2.28676 13.6997 1.58712C13.2151 1.03251 13.3339 0.319803 13.9244 0.0646639C14.265 -0.0824896 14.5559 0.0336694 14.7928 0.29018C16.152 1.76191 17.501 3.24478 18.8588 4.71806C19.045 4.92014 19.0487 5.07333 18.8598 5.27815C17.5124 6.73835 16.1765 8.21119 14.8261 9.66798C14.4291 10.0962 13.9913 10.1012 13.6463 9.73491C13.3018 9.36928 13.3074 8.84446 13.6968 8.40182C14.2666 7.75422 14.8574 7.12869 15.4374 6.49177C15.5682 6.34814 15.6914 6.19632 15.8181 6.04826C15.8089 5.98748 15.7997 5.92669 15.7905 5.8659C14.7333 5.8659 13.6761 5.8659 12.5715 5.86591Z" fill="#F5B452"/>
</svg>`;

  const outSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M15.5715 12.8659C11.663 12.8655 7.80196 12.8666 3.94095 12.8634C3.24529 12.8629 2.96645 12.5654 3.00319 11.8967C3.02782 11.4484 3.25631 11.2044 3.64899 11.1405C3.80402 11.1153 3.96485 11.1306 4.12305 11.1306C8.85437 11.1305 13.5857 11.1308 18.317 11.131C18.4889 11.1311 18.6609 11.131 18.8655 11.131C18.8431 10.8764 18.6811 10.7751 18.5686 10.6499C17.9485 9.95928 17.3111 9.28676 16.6997 8.58712C16.2151 8.03251 16.3339 7.3198 16.9244 7.06466C17.265 6.91751 17.5559 7.03367 17.7928 7.29018C19.152 8.76191 20.501 10.2448 21.8588 11.7181C22.045 11.9201 22.0487 12.0733 21.8598 12.2782C20.5124 13.7383 19.1765 15.2112 17.8261 16.668C17.4291 17.0962 16.9913 17.1012 16.6463 16.7349C16.3018 16.3693 16.3074 15.8445 16.6968 15.4018C17.2666 14.7542 17.8574 14.1287 18.4374 13.4918C18.5682 13.3481 18.6914 13.1963 18.8181 13.0483C18.8089 12.9875 18.7997 12.9267 18.7905 12.8659C17.7333 12.8659 16.6761 12.8659 15.5715 12.8659Z" fill="#F27281"/>
</svg>`;

  const allSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <circle cx="12" cy="12" r="4" fill="#232F6A"/>
  <circle cx="21" cy="12" r="3" fill="#232F6A" fill-opacity="0.5"/>
  <circle cx="3" cy="12" r="3" fill="#232F6A" fill-opacity="0.5"/>
  <circle cx="12" cy="21" r="3" fill="#232F6A" fill-opacity="0.5"/>
  <circle cx="12" cy="3" r="3" fill="#232F6A" fill-opacity="0.5"/>
  <circle cx="19" cy="5" r="2" fill="#232F6A" fill-opacity="0.5"/>
  <circle cx="5" cy="5" r="2" fill="#232F6A" fill-opacity="0.5"/>
  <circle cx="5" cy="19" r="2" fill="#232F6A" fill-opacity="0.5"/>
  <circle cx="19" cy="19" r="2" fill="#232F6A" fill-opacity="0.5"/>
</svg>`;

  const expandList: ExpandList = isNode ? JSON.parse(localStorage.getItem('node') ?? '') : [];

  localStorage.removeItem('node');

  const list = expandList.length
    ? `${expandList
        .map(
          (l) =>
            `<span id="${l.project_edge_type_id}"><p>${l.direction === 'in' ? inSvg : outSvg}</p> ${l.name} (${
              l.count
            })</span>`
        )
        .join()
        .replaceAll(',', ' ')}`
    : '';

  const allCount = expandList.reduce((prev, acc) => acc.count + prev, 0);

  const allData = `<span id="all"><p>${allSvg}</p> All (${allCount})</span>`;

  const nodeContext = `<div class='menu'>
      <span>Focus on node</span>
      <span class="main-menu expand">Expand</span>
      <div class='menu submenu-container'>
        <div class='submenu'>
          ${allData}
          ${list}
        </div>
      </div>
      <span class='delete'>Delete</span>
    </div>`;

  const canvasContext = `<div class='menu'>
      <span>Create Node</span>
    </div>`;

  const edgeContext = `<div class='menu'>
      <span class='delete'>Delete</span>
    </div>`;

  const comboContext = `<div class='menu'>
      <span class='delete'>Delete</span>
    </div>`;

  return { canvasContext, nodeContext, comboContext, edgeContext };
};
