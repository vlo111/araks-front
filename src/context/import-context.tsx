import { ColumnsType } from 'antd/es/table';
import { ProjectTypePropertyReturnData } from 'api/types';
import { LongTitle } from 'components/typography';
import { VARIABLES } from 'helpers/constants';
import { CsvType, ExcelType } from 'pages/import/types';
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
  IMPORT_MAPPING_SET_COLUMNS = 'IMPORT_MAPPING_SET_COLUMNS', //set columns from main table, where it will show
  IMPORT_MAPPING_CHECK_APPROVE = 'IMPORT_MAPPING_CHECK_APPROVE', // Runs when user approves check result
  IMPORT_MAPPING_RESULT = 'IMPORT_MAPPING_RESULT', // See result in table
  IMPORT_SET_RULE = 'IMPORT_SET_RULE', // Set rule step
  IMPORT_SET_RULE_ACTION = 'IMPORT_SET_RULE_ACTION', // Selecting one of options in set rules page
  IMPORT_MERGE = 'IMPORT_MERGE', // Merge step
}

export interface ItemMapping {
  key: string;
  dataFields: string;
  importedFields?: string;
  property: ProjectTypePropertyReturnData;
  check?: {
    matched: boolean;
    count?: number;
  };
}

export interface MappingResult {
  [x: string]: ItemMapping;
}

export enum SetImportRule {
  Skip = 'skip',
  Overwrite = 'overwrite',
}

export type ImportState = {
  activeTab?: number;
  columns?: ColumnsType<unknown[]> | undefined;
  columnsMapped?: ColumnsType<unknown[]> | undefined;
  columnRow?: [string, string] | undefined;
  data?: unknown[];
  dataSource?: unknown[][];
  fileName?: string; //uploaded file name
  firstRowIsColumn?: string; //filter in second step
  importConfirm?: boolean; //confirm modal open
  importOpen?: boolean; //file upload window
  importSteps?: boolean; //import process steps
  isCSV?: boolean; //to check if file is csv or not
  mapping?: MappingResult;
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
        firstRowIsColumn: state.isCSV ? 'no' : undefined,
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
    case ImportActionType.IMPORT_MAPPING_CHECK_APPROVE: //Approve check result
      return {
        ...state,
        mapping: {
          ...(state?.mapping ?? {}),
          ...(payload as MappingResult),
        },
      };
    case ImportActionType.IMPORT_MAPPING_SET_COLUMNS: //here it saves columnMapped and project type id
      return {
        ...state,
        ...payload,
      };
    case ImportActionType.IMPORT_MAPPING_RESULT: //Mapping result in table
      let columnData = {};

      const importedFields = Object.values(state.mapping as { [s: string]: ItemMapping } | ArrayLike<ItemMapping>).map(
        (item) => item.importedFields
      );

      if (state.isCSV) {
        const dataSource = (state.data as CsvType[])?.map((item) => {
          return Object.values(state.mapping as { [s: string]: ItemMapping } | ArrayLike<ItemMapping>).reduce(
            (acc, column) => {
              return {
                ...acc,
                [column.key]: item[column.importedFields as string],
              };
            },
            {}
          );
        });
        // const columnsMappingResult = state.columns
        //   ?.filter((item) => importedFields.includes(item.title as string))
        //   .slice();
        // const columnsMappingResult = importedFields
        //   .map((item, index) => ({
        //     key: index,
        //     title: item,
        //     dataIndex: item,
        //   }))
        //   .slice();
        // const extractedData = (state.data as CsvType[])?.map((item) => {
        //   const extractedItem = {} as CsvType;
        //   (importedFields as [string, string]).forEach((key) => {
        //     extractedItem[key] = item[key];
        //   });
        //   return extractedItem;
        // });

        columnData = {
          // columns: columnsMappingResult,
          sheetData: {
            ...(state.sheetData as ExcelType),
            data: dataSource,
          },
          dataSource: createCsvDataSource(dataSource),
        };
      } else {
        // // const columnsMappingResult = state.columns
        // //   ?.filter((item) => importedFields.includes(item.title as string))
        // //   .map((item, index) => ({ ...item, dataIndex: `import${index}` }))
        // //   .slice();
        // const columnsMappingResult = importedFields
        //   .map((item, index) => ({
        //     key: index,
        //     title: item,
        //     dataIndex: `import${index}`,
        //     index: state.columns?.find((col) => col.title === item)?.key,
        //   }))
        //   .slice();
        // const importedKeys = Object.values(columnsMappingResult).map((item) => item.index);

        // const sheetDataMapping = (state.sheetData as ExcelType)?.data.map((subArray) =>
        //   importedKeys.map((index) => subArray[index as number])
        // ) as [string, string][];

        // columnData = {
        //   columns: columnsMappingResult,
        //   sheetData: {
        //     ...(state.sheetData as ExcelType),
        //     data: sheetDataMapping,
        //   },
        //   dataSource: createTableData(sheetDataMapping, columnsMappingResult?.length),
        // };

        const mergedObject = Object.keys(state.mapping as { [s: string]: ItemMapping } | ArrayLike<ItemMapping>).reduce(
          (acc, key) => {
            const column = (state.mapping as { [s: string]: ItemMapping })[key];
            const keyIndex = state.columns?.findIndex((item) => item.title === column.importedFields) as number;
            if (keyIndex !== -1) {
              acc[column.key] = {
                ...column,
                dataIndex: state.columns?.[keyIndex].key as number,
              };
            }
            return acc;
          },
          {} as { [s: string]: ItemMapping & { dataIndex: number } }
        );

        const dataSource = (state.sheetData as ExcelType)?.data.map((item) => {
          return Object.values(mergedObject).reduce((acc, column) => {
            return {
              ...acc,
              [column.key]: item[column.dataIndex],
            };
          }, {});
        });

        columnData = {
          sheetData: {
            ...(state.sheetData as ExcelType),
            data: dataSource,
          },
          dataSource: createCsvDataSource(dataSource),
        };
      }

      return {
        ...state,
        ...payload,
        columns: state.columnsMapped,
        showMappingResult: true,
        columnRow: importedFields as [string, string],

        ...columnData,
      };
    case ImportActionType.IMPORT_SET_RULE:
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
