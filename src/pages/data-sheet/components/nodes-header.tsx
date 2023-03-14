import { useState } from "react";
import { Button, Space } from "antd";
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';
import { Text } from "components/typography";
import { PlusOutlined } from '@ant-design/icons';
import { SearchAction } from "components/actions";
import { useDataSheetWrapper } from "components/layouts/components/data-sheet/wrapper";
import useGetProjectNoteTypes, { GET_PROJECT_NODE_TYPES_LIST } from "api/project-node-types/use-get-project-note-types";
import { useParams } from "react-router-dom";

export const NodesHeader = () => {
    const params = useParams();
    const [visible, setVisible] = useState(false);
    const { setAddType } = useDataSheetWrapper();

    const { data } = useGetProjectNoteTypes({
        url: GET_PROJECT_NODE_TYPES_LIST,
        projectId: params.id || ''
    }, { enabled: !!params.id });

    return <Space size={8} style={{ width: '100%' }} align='center' >
        <Button type="text" icon={visible ? <CaretUpFilled /> : <CaretDownFilled />} onClick={() => setVisible(prev => !prev)}>
            <Text>Node Type</Text>
        </Button>
        <SearchAction />
        <PlusOutlined  style={{ cursor: 'pointer' }} onClick={() => setAddType(true)} />
    </Space>
}