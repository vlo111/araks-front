import { Col, Row as RowComponent } from "antd"
import { Share } from "pages/project-overview/share";
import { useMemo, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";

export const DataSheetWrapper = () => {
    const params = useParams();
    const [addType, setAddType] = useState();
    const context = useMemo(() => ({
        color: '#232F6A',
        setAddType,
    }), []);

    return <Outlet context={context} /> 
}