import useGetDictionary, { GET_DICTIONARY_PROPERTY_TYPES } from "api/dictionary/use-get-dictionary"
import { Select } from "."
import { SelectProps } from "antd";

export const PropertyDataTypeSelect = () => {
    const { data } = useGetDictionary(GET_DICTIONARY_PROPERTY_TYPES);
    console.log('data', data)
    return <Select 
        style={{ width: '100%' }} 
        placeholder="Please select" 
        // fieldNames={{value: 'key'}}
    />
}