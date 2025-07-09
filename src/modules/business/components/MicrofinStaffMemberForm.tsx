import { Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
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
        <Form.Item label="First Name">
          <Input placeholder="enter first name" />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input placeholder="enter last name" />
        </Form.Item>
        <Form.Item label="Email">
          <Input placeholder="enter email" />
        </Form.Item>
        <Form.Item label="Password">
          <Input placeholder="enter password" />
        </Form.Item>
        <Form.Item label="Confirm Password">
          <Input placeholder="enter password confirmation" />
        </Form.Item>
        <Form.Item label="Confirm Password">
          <Input placeholder="enter password confirmation" />
        </Form.Item>
        <Form.Item label="ID Type" name="idType" rules={[{ required: false }]}>
          <Select placeholder="Select type" id="">
            <Option value="nrc">NRC</Option>
            <Option value="passport">Passport</Option>
            <Option value="driversLicense">Drivers License</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};
