import { PATHS } from "helpers/constants";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Araks } from '../icons/araks.svg';

type Props = {
    margin?: string
}

export const Logo = ({ margin }: Props) => {
    const navigate = useNavigate();

    return <Araks style={{ cursor: 'pointer', ...(margin ? { margin }: {}) }} onClick={() => navigate(PATHS.ROOT)} />;
}