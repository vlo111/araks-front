import { Button } from "antd"
import { useAuth } from "context/auth-context"

export const HeaderProfile = () => {
    const { logout } = useAuth();
    const onLogout = () => {
        logout();
    }

    return <Button onClick={onLogout}>Sign Out</Button>
}