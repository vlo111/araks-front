import { Avatar, List, Space } from "antd";
import { Share } from "components/dropdown";
import { Text } from "components/typography";
import { logedInUser } from "helpers/utils";


export const SharedWith = () => {
    const data = [
        {
            title: logedInUser.email,
        }
    ];
    return <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item actions={[<Share isOwner />]}>
        <List.Item.Meta
          avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
          title={<Text>{item.title}</Text>}
          description=" "
        />
      </List.Item>
    )}
  />
}