import { Avatar, List } from "antd";
import { Share } from "components/dropdown";
import { SHARE_OPTIONS } from "components/dropdown/constants";
import { Text } from "components/typography";
import { useAuth } from "context/auth-context";
import { useIsXXlScreen } from "hooks/use-breakpoint";
import styled from "styled-components";

const StyledList = styled(List)``;

export const SharedWith = () => {
  const isXXl = useIsXXlScreen();
  const { user: logedInUser } = useAuth();
    const data = [
        {
            title: logedInUser?.email,
            value: SHARE_OPTIONS[2].value,
            avatar: logedInUser?.avatar,
        }
    ];
    return <List
    itemLayout={isXXl ? "horizontal" : 'vertical'}
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item actions={[<Share defaultValue={item.value} />]}>
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          description={<Text>{item.title}</Text>}
        />
      </List.Item>
    )}
  />
}