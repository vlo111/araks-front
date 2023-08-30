import { PropertyTypes } from 'components/form/property/types';
import { DataResult, DataResultItem, ItemMapping } from 'context/import-context';
import dayjs from 'dayjs';
import { CsvType } from 'pages/import/types';
import { ResponseLocationType } from 'types/node';

type AcceptedType = 'date' | 'datetime' | 'string' | 'boolean' | 'integer' | 'decimal';

type DataWrongResult = {
  [x: string]: {
    count: number;
    allData: number;
    emptyValue: number;
  };
};

export function getColumnType(initType: PropertyTypes): AcceptedType {
  switch (initType) {
    case PropertyTypes.Connection:
    case PropertyTypes.Text:
    case PropertyTypes.RichText:
    case PropertyTypes.Location:
      return 'string';
    default:
      return initType as AcceptedType;
  }
}

/*** For excell I can add new new parameter to send index */
export function processDataWithType(
  dataMapping: ItemMapping[],
  dataArr: [string, string][] | CsvType[],
  isCSV?: boolean
) {
  const dataResult: DataResult = {};
  const dataWrongResult = {} as DataWrongResult;
  const dataToMap = dataArr.slice();
  const uniqueValues = new Set<unknown>();

  rowloop: for (let i = dataToMap.length; i > 0; i--) {
    const index = i - 1;

    const row = dataToMap[index] as CsvType;

    if (!row.length && !isCSV) {
      dataToMap.splice(index, 1);
      // wrongValueCount.count++;
      // wrongValueCount.emptyValue++;
      continue;
    }
    for (const mapData of dataMapping) {
      const wrongValueCount = dataWrongResult[mapData.key] ?? { count: 0, allData: dataToMap.length, emptyValue: 0 };
      //csv
      const cellValue = row[mapData.importedFieldsIndex ?? (mapData.importedFields as string)] as unknown;

      if (mapData.property.default_property && (cellValue === null || cellValue === undefined || cellValue === '')) {
        dataToMap.splice(index, 1);
        wrongValueCount.count++;
        wrongValueCount.emptyValue++;
        continue rowloop;
      }

      if (cellValue === null || cellValue === undefined || cellValue === '') {
        wrongValueCount.emptyValue++;
        if (mapData.property.required_type) {
          dataToMap.splice(index, 1);
          wrongValueCount.count++;
          delete dataResult[index];

          continue rowloop;
        }
        dataResult[index] = [
          ...(dataResult[index] || ([] as DataResultItem[])),
          {
            ...mapData.property,
            key: mapData.key,
            dataField: mapData.dataFields,
            importedField: mapData.importedFields,
            value: '',
          },
        ];

        dataWrongResult[mapData.key] = wrongValueCount;
        continue;
      }

      let convertedValue;
      switch (mapData.property.ref_property_type_id) {
        case PropertyTypes.Text:
          if (typeof cellValue !== 'string') {
            if (
              typeof cellValue === 'object' ||
              typeof (cellValue as ResponseLocationType)?.location?.latitude === 'number' ||
              typeof (cellValue as ResponseLocationType)?.location?.longitude === 'number'
            ) {
              convertedValue = (cellValue as ResponseLocationType)?.address;
            }
            convertedValue = (cellValue as string).toString();
          }
          convertedValue = cellValue;
          break;
        case PropertyTypes.Date:
        case PropertyTypes.DateTime:
          const dateObj = new Date(cellValue as string);
          const isValidDate = !isNaN(dateObj.getTime());
          if (isValidDate) {
            convertedValue = dayjs(dateObj.toISOString()).format('DD-MM-YYYY');
            break;
          }

          wrongValueCount.count++;
          convertedValue = null;
          break;
        case PropertyTypes.Integer:
          const parsedValueInt = parseInt(cellValue as string, 10);
          if (isNaN(parsedValueInt)) {
            wrongValueCount.count++;
            convertedValue = null;
            break;
          }
          convertedValue = parsedValueInt;
          break;
        case PropertyTypes.Decimal:
          const parsedValueDec = parseFloat(cellValue as string);
          if (isNaN(parsedValueDec)) {
            wrongValueCount.count++;
            convertedValue = null;
            break;
          }
          convertedValue = parsedValueDec;
          break;
        case PropertyTypes.Boolean:
          if ((cellValue as string) === 'true') {
            convertedValue = true;
          } else if ((cellValue as string) === 'false') {
            convertedValue = false;
          } else {
            wrongValueCount.count++;
            convertedValue = null;
          }
          break;
        case PropertyTypes.Location:
          const v = cellValue as ResponseLocationType;
          if (
            typeof v !== 'object' ||
            typeof v?.location?.latitude !== 'number' ||
            typeof v?.location?.longitude !== 'number'
          ) {
            wrongValueCount.count++;
            convertedValue = null;
            break;
          }
          convertedValue = { latitude: v?.location?.latitude, longitude: v?.location?.longitude };
          break;
        case PropertyTypes.IMAGE_URL:
        case PropertyTypes.URL:
        case PropertyTypes.Document:
          convertedValue = cellValue; // Return the original value without modification
          break;
        case PropertyTypes.RichText:
          if (typeof (cellValue as string) !== 'string' || (cellValue as string).trim() === '') {
            wrongValueCount.count++;
            convertedValue = null;
            break;
          }
          convertedValue = cellValue as string;
          break;
        default:
          //   throw new Error(`Invalid data type: ${mapData.property.ref_property_type_id}`);
          convertedValue = null;
          break;
      }

      //   // If isUnique is true, check for uniqueness
      if (mapData.property.unique_type && convertedValue) {
        if (uniqueValues.has(convertedValue + mapData.key)) {
          if (mapData.property.required_type) {
            dataToMap.splice(index, 1);
            delete dataResult[index];
            wrongValueCount.count++;
            continue rowloop;
          }
          convertedValue = '';
        } else {
          uniqueValues.add(convertedValue + mapData.key);
        }
      }

      dataResult[index] = [
        ...(dataResult[index] || ([] as DataResultItem[])),
        {
          ...mapData.property,
          dataField: mapData.dataFields,
          importedField: mapData.importedFields,
          key: mapData.key,
          value: convertedValue,
        },
      ];

      dataWrongResult[mapData.key] = wrongValueCount;
    }
  }

  return {
    data: Object.values(dataResult),
    wrongDataInfo: dataWrongResult,
  };
}
