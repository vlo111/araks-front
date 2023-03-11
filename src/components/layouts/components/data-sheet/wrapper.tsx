import { Col, Row as RowComponent } from "antd"
import { Share } from "pages/project-overview/share";
import { useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";

export const DataSheetWrapper = () => {
    const params = useParams();
    const context = useMemo(() => ({
        a: 'hello'
    }), []);

    return <Outlet context={context} /> 
}