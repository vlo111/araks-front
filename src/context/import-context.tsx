import { ColumnsType } from 'antd/es/table';
import { ProjectTypePropertyReturnData } from 'api/types';
import { LongTitle } from 'components/typography';
import { VARIABLES } from 'helpers/constants';
import { CsvType, ExcelType } from 'pages/import/types';
import { createContext, Dispatch, ReactNode, useContext, useMemo, useReducer } from 'react';
import { ImportNodesResponse } from 'api/import/types';

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
  IMPORT_MAPPING_SET_COLUMNS = 'IMPORT_MAPPING_SET_COLUMNS', //set columns from main table, where it will show
  IMPORT_MAPPING_CLEAR_WARNING = 'IMPORT_MAPPING_CLEAR_WARNING', // Clear warning when user clicks ignore warnings
  IMPORT_MAPPING_RESULT = 'IMPORT_MAPPING_RESULT', // See result in table
  IMPORT_MAPPING_SAVE_DATA = 'IMPORT_MAPPING_SAVE_DATA', // See result in table
  IMPORT_MAPPING_CLEAR_DATA = 'IMPORT_MAPPING_CLEAR_DATA', // CLEAR SAVED DATA ONCE USER CLEARS DEFAULT SELECTED VALUE
  IMPORT_SET_RULE = 'IMPORT_SET_RULE', // Set rule step
  IMPORT_SET_RULE_ACTION = 'IMPORT_SET_RULE_ACTION', // Selecting one of options in set rules page
  IMPORT_MERGE = 'IMPORT_MERGE', // Merge step
  IMPORT_MERGE_RESULT = 'IMPORT_MERGE_RESULT', // Merge step
}

export interface ItemMapping {
  key: string;
  dataFields: string;
  importedFields?: string;
  importedFieldsIndex?: number;
  property: ProjectTypePropertyReturnData;
  check?: {
    matched: boolean;
    count: number;
    allData: number;
    emptyValue: number;
  };
}

export interface MappingResult {
  [x: string]: ItemMapping;
}

export enum SetImportRule {
  Skip = 'skip',
  Overwrite = 'overwrite',
}

export type DataResultItem = ProjectTypePropertyReturnData & {
  key: string;
  value: unknown;
};

export type DataResult = {
  [x: string]: DataResultItem[];
};

export type ImportState = {
  activeTab?: number;
  columns?: ColumnsType<unknown[]> | undefined;
  columnsMapped?: ColumnsType<unknown[]> | undefined;
  columnRow?: [string, string] | undefined;
  data?: unknown[];
  dataSource?: unknown[][];
  dataToSave?: DataResultItem[];
  fileName?: string; //uploaded file name
  firstRowIsColumn?: string; //filter in second step
  importConfirm?: boolean; //confirm modal open
  importOpen?: boolean; //file upload window
  importSteps?: boolean; //import process steps
  isCSV?: boolean; //to check if file is csv or not
  mapping?: ItemMapping[];
  mappingSaved?: boolean;
  mappingHasWarning?: boolean;
  mergedData?: ImportNodesResponse;
  showMapping?: boolean; //show mapping data in third step, there we also have grid data show that's why we need this, if false show grid
  showMappingResult?: boolean; //show mapping result in a greid
  skipRowsCount?: number; //filter in second step
  sheetData?: unknown;
  type_id?: string;
  step?: number; //step number, start from 0 as first page
  setRulesSkipOverwrite?: SetImportRule;
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
  isCSV: false,
  firstRowIsColumn: 'no',
  mapping: [],
  mappingSaved: false,
  mappingHasWarning: true,
  showMapping: false,
  showMappingResult: false,
  setRulesSkipOverwrite: SetImportRule.Skip,
};

const createTableData = (data: Array<[string, string]>, columnsLenght = 1) => {
  return data.map((row, indexRow) =>
    row.reduce((acc, item, index) => {
      return {
        key: indexRow,
        ...acc,
        ...{
          [`import${index}`]:
            item && typeof item === 'string' && item.length > VARIABLES.MAX_PROJECT_TITLE_LENGTH ? (
              <LongTitle
                style={{ maxWidth: '500px' }}
                className="button-content__text"
                name={item}
                cutPosition={(VARIABLES.MAX_PROJECT_TITLE_LENGTH / columnsLenght) * 10}
              />
            ) : (
              item
            ),
        },
      };
    }, [])
  );
};

const createCsvDataSource = (data: unknown[], columnsLenght = 1) => {
  return data.map((row, index) => {
    return Object.keys(row as CsvType).reduce((acc, item) => {
      const value = (row as CsvType)[item];
      return {
        key: index,
        ...acc,
        ...{
          [item]:
            value && typeof value === 'string' && value.length > VARIABLES.MAX_PROJECT_TITLE_LENGTH ? (
              <LongTitle
                style={{ maxWidth: '500px' }}
                className="button-content__text"
                name={value}
                cutPosition={(VARIABLES.MAX_PROJECT_TITLE_LENGTH / columnsLenght) * 10}
              />
            ) : (
              value
            ),
        },
      };
    }, []);
  });
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
        ...importInitialState,
        importOpen: true,
      };
    case ImportActionType.IMPORT_CLOSE:
      return {
        ...importInitialState,
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
      // save data for CSV
      let csvData = {};
      if (state.isCSV) {
        csvData = {
          columns: Object.keys(state?.data?.[0] as CsvType).map((key) => ({
            title: key,
            dataIndex: key,
            key,
          })),
          columnRow: Object.keys(state?.data?.[0] as CsvType),
          dataSource: createCsvDataSource(state.data?.slice(0, 6) as unknown[]),
          sheetData: {
            data: state.data?.slice(),
          },
        };
      }

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
        ...csvData,
      };
    case ImportActionType.IMPORT_SUCCESS_BACK:
      return {
        ...importInitialState,
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
        firstRowIsColumn: 'no',
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
        dataSource: state.isCSV ? createCsvDataSource(dataTorWorkSkip) : createTableData(dataTorWorkSkip),
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
    case ImportActionType.IMPORT_MAPPING_SET_COLUMNS: //here it saves columnMapped and project type id
      return {
        ...state,
        ...payload,
      };
    case ImportActionType.IMPORT_MAPPING_RESULT: //Mapping result in table
      return {
        ...state,
        showMappingResult: true,
      };
    case ImportActionType.IMPORT_MAPPING_SAVE_DATA: //should be instead of above one
      return {
        ...state,
        columns: state.columnsMapped,
        mappingSaved: true,
        mappingHasWarning: payload.mappingHasWarning,
        dataToSave: payload.sheetData as DataResultItem[],
        mapping: payload.mapping,
        dataSource: createCsvDataSource(
          (payload.sheetData as DataResultItem[][]).map((innerArray) => {
            const obj = {} as CsvType;
            innerArray.forEach((item) => {
              obj[item.key] = item.value as string;
            });
            return obj;
          })
        ),
      };
    case ImportActionType.IMPORT_MAPPING_CLEAR_DATA:
      return {
        ...state,
        mappingSaved: true,
        dataToSave: undefined,
        mapping: [],
        mappingHasWarning: true,
        ...payload,
      };
    case ImportActionType.IMPORT_MAPPING_CLEAR_WARNING:
      return {
        ...state,
        mappingHasWarning: false,
      };
    case ImportActionType.IMPORT_SET_RULE:
      if (!state.mappingSaved || state.mappingHasWarning) {
        return state;
      }
      return {
        ...state,
        ...payload,
        step: 3,
      };
    case ImportActionType.IMPORT_SET_RULE_ACTION:
      return {
        ...state,
        ...payload,
      };
    case ImportActionType.IMPORT_MERGE:
      return {
        ...state,
        ...payload,
        step: 4,
      };
    case ImportActionType.IMPORT_MERGE_RESULT:
      return {
        ...state,
        ...payload,
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
