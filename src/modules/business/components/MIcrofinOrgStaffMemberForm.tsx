import { Form } from "antd";
import { number } from "framer-motion";

type UserItemProps = {
  name: number;
  fieldKey: React.Key;
};

const UserItem: React.FC<UserItemProps> = ({ name, fieldKey }) => {
  return (
    <div
      key={fieldKey}
      className="grid grid-cols-1 gap-4 mb-4 shadow-sm p-4 rounded relative bg-white"
    ></div>
  );
};

export const MicrofinOrgStaffMemberForm = () => {
  const [form] = Form.useForm();
  return (
    <div className=" pt-4">
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, marginTop: 24 }}
        className=" grid grid-cols-1 gap-8 items-center"
      >
        <Form.Item label="Nam"></Form.Item>
      </Form>
    </div>
  );
};
