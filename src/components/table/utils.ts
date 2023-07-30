import { PropertyTypes } from 'components/form/property/types';
import { DataResult, DataResultItem, ItemMapping } from 'context/import-context';
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
  excellIndex?: number
) {
  const dataResult: DataResult = {};
  const dataWrongResult = {} as DataWrongResult;
  const dataToMap = dataArr.slice();

  dataMapping.forEach((mapData) => {
    const wrongValueCount = { count: 0, allData: dataToMap.length, emptyValue: 0 };
    const uniqueValues = new Set<unknown>();

    for (let i = dataToMap.length; i > 0; i--) {
      const index = i - 1;
      const row = dataToMap[index] as CsvType;

      //csv
      const cellValue = row[mapData.importedFieldsIndex || (mapData.importedFields as string)] as unknown;

      // eslint-disable-next-line no-console
      console.log('cellValue', cellValue, row, mapData.importedFieldsIndex);

      if (mapData.property.default_property && (cellValue === null || cellValue === undefined || cellValue === '')) {
        dataToMap.splice(index, 1);
        wrongValueCount.count++;
        wrongValueCount.emptyValue++;
        break;
      }

      if (cellValue === null || cellValue === undefined || cellValue === '') {
        wrongValueCount.emptyValue++;
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
            convertedValue = dateObj.toISOString();
          }
          wrongValueCount.count++;
          convertedValue = null;
          break;
        case PropertyTypes.Integer:
          const parsedValueInt = parseInt(cellValue as string, 10);
          if (isNaN(parsedValueInt)) {
            wrongValueCount.count++;
            convertedValue = null;
          }
          convertedValue = parsedValueInt;
          break;
        case PropertyTypes.Decimal:
          const parsedValueDec = parseFloat(cellValue as string);
          if (isNaN(parsedValueDec)) {
            wrongValueCount.count++;
            convertedValue = null;
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
        if (uniqueValues.has(convertedValue)) {
          dataToMap.splice(index, 1);
          wrongValueCount.count++;
          break;
        } else {
          uniqueValues.add(convertedValue);
        }
      }

      //csv
      //   row[mapData?.importedFields as string] = convertedValue as string;

      // eslint-disable-next-line no-console
      //   console.log('dataResult', dataResult[index], [
      //     ...(dataResult[index] || ([] as DataResultItem[])),
      //     {
      //       ...mapData.property,
      //       key: mapData.key,
      //       value: convertedValue,
      //       //   wrongValueCount,
      //     },
      //   ]);

      //   dataResult = {
      //     ...dataResult,
      //     [index]: [
      //       ...(dataResult[index] || []),
      //       {
      //         ...mapData.property,
      //         key: mapData.key,
      //         value: convertedValue,
      //         //   wrongValueCount,
      //       },
      //     ],
      //   };
      // eslint-disable-next-line no-console

      dataResult[index] = [
        ...(dataResult[index] || ([] as DataResultItem[])),
        {
          ...mapData.property,
          key: mapData.key,
          value: convertedValue,
        },
      ];

      // eslint-disable-next-line no-console
      //   console.log('Innereeeeeeeeeeeeeeeeeeeeeeee', dataResult, dataResult[index] || ([] as DataResultItem[]), {
      //     ...mapData.property,
      //     key: mapData.key,
      //     value: convertedValue,
      //   });

      dataWrongResult[mapData.key] = wrongValueCount;
    }
    // eslint-disable-next-line no-console
    // console.log('dataResultEEEEND', dataResult);
  });

  return {
    data: Object.values(dataResult),
    wrongDataInfo: dataWrongResult,
  };
}
