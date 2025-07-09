import { Form } from "antd";

export const StaffMemberForm = () => {
  const [form] = Form.useForm();
  return (
    <div className=" pt-4">
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, marginTop: 24 }}
        className=" grid grid-cols-1 gap-8 items-center"
      ></Form>
    </div>
  );
};
