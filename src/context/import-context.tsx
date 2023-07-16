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
}

export type ImportState = {
  importOpen?: boolean; //file upload window
  fileName?: string; //uploaded file name
  importConfirm?: boolean; //confirm modal open
  importSteps?: boolean; //import process steps
  step?: number; //step number, start from 0 as first page
  data?: unknown[];
  activeTab?: number;
  dataSource?: unknown[][];
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
    case ImportActionType.IMPORT_SUCCESS_NEXT:
      return {
        ...state,
        ...payload,
        importSteps: true,
        importConfirm: false,
        importOpen: false,
        // step options
        step: 0,
      };
    case ImportActionType.IMPORT_SUCCESS_BACK:
      return {
        importConfirm: false,
        importOpen: true,
      };
    case ImportActionType.IMPORT_SHEET_SELECT_DATA:
      const sheetData = state?.data?.[payload?.activeTab || 0] as ExcelType;
      const dataTorWork = sheetData.data.slice(0, 6);

      return {
        ...state,
        ...payload,
        dataSource: createTableData(dataTorWork),
        sheetData,
      };
    case ImportActionType.IMPORT_CLEANING_STEP:
      return {
        ...state,
        ...payload,
        step: 1,
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
