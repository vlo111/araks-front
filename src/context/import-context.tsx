import { ColumnsType } from 'antd/es/table';
import { LongTitle } from 'components/typography';
import { VARIABLES } from 'helpers/constants';
import { ExcelType } from 'pages/import/types';
import { createContext, Dispatch, ReactNode, useContext, useMemo, useReducer } from 'react';

enum ImportActionType {
  IMPORT_OPEN = 'IMPORT_OPEN',
  IMPORT_CLOSE = 'IMPORT_CLOSE',
  IMPORT_SUCCESS_CONFIRM = 'IMPORT_SUCCESS_CONFIRM', // Open modal with Next and Back buttons
  IMPORT_SUCCESS_NEXT = 'IMPORT_SUCCESS_NEXT', //Go to steps
  IMPORT_SUCCESS_BACK = 'IMPORT_SUCCESS_BACK', //back to file upload window
  IMPORT_SHEET_SELECT_DATA = 'IMPORT_SHEET_SELECT_DATA', //Add selected sheet data for further manipulation
  IMPORT_CLEANING_STEP = 'IMPORT_CLEANING_STEP', //SECOND STEP
  IMPORT_CLEANING_SKIP_ROWS = 'IMPORT_CLEANING_SKIP_ROWS', //SECOND STEP skip top rows by count
  IMPORT_CLEANING_FIRST_ROW_AS_HEADER = 'IMPORT_CLEANING_FIRST_ROW_AS_HEADER', //SECOND STEP make first row as table column names
  IMPORT_MAPPING_STEP = 'IMPORT_MAPPING_STEP', //THIRD STEP
}

export type ImportState = {
  activeTab?: number;
  columns?: ColumnsType<unknown[]> | undefined;
  columnRow?: [string, string] | undefined;
  data?: unknown[];
  dataSource?: unknown[][];
  fileName?: string; //uploaded file name
  firstRowIsColumn?: string; //filter in second step
  importConfirm?: boolean; //confirm modal open
  importOpen?: boolean; //file upload window
  importSteps?: boolean; //import process steps
  showMapping?: boolean; //show mapping data in third step, there we also have grid data show that's why we need this, if false show grid
  skipRowsCount?: number; //filter in second step
  sheetData?: unknown;
  step?: number; //step number, start from 0 as first page
};
type ImportAction = {
  type: ImportActionType;
  payload: ImportState;
};

type DispatchAction = Dispatch<ImportAction>;
type ViewProviderProps = { children: ReactNode };

const ImportContext = createContext<{ state: ImportState; dispatch: DispatchAction } | undefined>(undefined);

const importInitialState = {
  importOpen: false,
  importConfirm: false,
  importSteps: false,
  showMapping: false,
};

const createTableData = (data: Array<[string, string]>) => {
  return data.map((row, index) =>
    row.reduce(
      (acc, item, index) => {
        return {
          ...acc,
          ...{
            [`import${index}`]:
              item && typeof item === 'string' && item.length > VARIABLES.MAX_PROJECT_TITLE_LENGTH ? (
                <LongTitle style={{ maxWidth: '500px' }} className="button-content__text" name={item} />
              ) : (
                item
              ),
          },
        };
      },
      [{ key: index }]
    )
  );
};

const createDraftColumns = (count: number) => [
  {
    title: 'N',
    dataIndex: 'rowNumber',
    key: 'rowNumber',
    render: (text: unknown, record: unknown, index: number) => {
      return index + 1;
    },
  },
  ...[...Array(count)].map((_, i) => ({
    title: 'None',
    key: i,
    dataIndex: `import${i}`,
  })),
];

const createColumns = (firstRow: [string, string] | undefined) => [
  {
    title: 'N',
    dataIndex: 'rowNumber',
    key: 'rowNumber',
    render: (text: unknown, record: unknown, index: number) => {
      return index + 1;
    },
  },
  ...(firstRow
    ? firstRow.map((item, i) => ({
        title: item,
        key: i,
        dataIndex: `import${i}`,
      }))
    : []),
];

const importReducer = (state: ImportState, action: ImportAction) => {
  const { type, payload } = action;
  // eslint-disable-next-line no-console
  console.log('type, payload', type, payload);
  switch (type) {
    case ImportActionType.IMPORT_OPEN:
      return {
        importOpen: true,
      };
    case ImportActionType.IMPORT_CLOSE:
      return {
        importOpen: false,
      };
    case ImportActionType.IMPORT_SUCCESS_CONFIRM:
      return {
        ...state,
        ...payload,
        importConfirm: true,
        importOpen: false,
      };
    case ImportActionType.IMPORT_SUCCESS_NEXT: // First step, TODO: remove everything related to step 2 for back operation
      return {
        ...state,
        ...payload,
        importSteps: true,
        importConfirm: false,
        importOpen: false,
        // step options
        step: 0,
        //remove steps actions higher that fist
        skipRowsCount: undefined,
        firstRowIsColumn: undefined,
        columnRow: undefined,
      };
    case ImportActionType.IMPORT_SUCCESS_BACK:
      return {
        importConfirm: false,
        importOpen: true,
      };
    case ImportActionType.IMPORT_SHEET_SELECT_DATA: //runs in first step to get first data and store selected sheet
      const sheetDataSelect = state?.data?.[payload?.activeTab || 0] as ExcelType;
      const dataTorWorkSelect = sheetDataSelect.data.slice(0, 6);

      return {
        ...state,
        ...payload,
        dataSource: createTableData(dataTorWorkSelect),
        sheetData: sheetDataSelect,
        columns: createDraftColumns(sheetDataSelect.data[0].length) as ColumnsType<unknown[]> | undefined,
      };
    case ImportActionType.IMPORT_CLEANING_STEP: // Second step, TODO: remove everything related to step 3 for back operation
      return {
        ...state,
        ...payload,
        step: 1,
      };
    case ImportActionType.IMPORT_CLEANING_SKIP_ROWS: // INSIDE Second step
      // const sheetDataSkip = state?.data?.[state?.activeTab || 0] as ExcelType;
      // const modifiedArray = sheetDataSkip.data.slice(payload.skipRowsCount);
      const sheetDataSkip = (state.sheetData as ExcelType).data;
      const modifiedArray = sheetDataSkip.slice(payload.skipRowsCount);
      const dataTorWorkSkip = modifiedArray.slice(0, 6);
      return {
        ...state,
        ...payload,
        dataSource: createTableData(dataTorWorkSkip),
        sheetData: {
          ...(state.sheetData as ExcelType),
          data: modifiedArray,
        },
      };
    case ImportActionType.IMPORT_CLEANING_FIRST_ROW_AS_HEADER: // Inside Second Step
      if (payload.firstRowIsColumn === 'no') {
        if (!state.firstRowIsColumn) {
          return {
            ...state,
            ...payload,
          };
        }
        const dataToReturn = [state.columnRow, ...(state.sheetData as ExcelType).data] as [string, string][];
        return {
          ...state,
          ...payload,
          columns: createDraftColumns(state.columnRow?.length || 0) as ColumnsType<unknown[]> | undefined,
          dataSource: createTableData(dataToReturn.slice(0, 6)),
          sheetData: {
            ...(state.sheetData as ExcelType),
            data: dataToReturn,
          },
        };
      }
      const sheetDataCols = (state.sheetData as ExcelType).data;
      const modifiedArrayCols = sheetDataCols.slice();
      const firstColumn = modifiedArrayCols.shift();
      const dataTorWorkCols = modifiedArrayCols.slice(0, 6);
      return {
        ...state,
        ...payload,
        columns: createColumns(firstColumn),
        columnRow: firstColumn,
        dataSource: createTableData(dataTorWorkCols),
        sheetData: {
          ...(state.sheetData as ExcelType),
          data: modifiedArrayCols,
        },
      };
    case ImportActionType.IMPORT_MAPPING_STEP: //Third step
      return {
        ...state,
        ...payload,
        step: 2,
        showMapping: true,
      };
    default:
      return state;
  }
};

function ImportProvider({ children }: ViewProviderProps) {
  const [state, dispatch] = useReducer(importReducer, importInitialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <ImportContext.Provider value={value}>{children}</ImportContext.Provider>;
}

function useImport() {
  const context = useContext(ImportContext);
  if (context === undefined) {
    throw new Error('useImport must be used within a ImportProvider');
  }
  return context;
}

export { ImportProvider, useImport, ImportActionType };
