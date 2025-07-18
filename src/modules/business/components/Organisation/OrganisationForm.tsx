import { useCreateOrganisationMutation } from "@/api/mutations/organisationMutation";
import { App, Button, Form, Input } from "antd";
import { useState } from "react";

export const OrganisationForm = () => {
  const [pageNumber] = useState<number | null>(1);
  const [pageSize] = useState(10);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const [organisationCreation] = useCreateOrganisationMutation();

  const handleSubmit = async (values: { name: string; contactNo: string }) => {
    try {
      const organizationId = Number(localStorage.getItem("organizationId"));

      if (!organizationId) {
        message.error("Organization ID not found");
        return;
      }
      const organisationData = {
        name: values.name,
        contactNo: values.contactNo,
      };
      await organisationCreation({ organizationId, organisationData });
      message.success("Microfin Organisation successfully created");
      form.resetFields();
    } catch (error) {
      console.log("Failed to create microin orgnisation");
    }
  };

  return (
    <div className=" px-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 1000, marginTop: 24 }}
        className=" grid grid-cols-1 gap-8 items-center"
      >
        {" "}
        <div>
          <p className=" font-semibold pb-2 text-lg">Organisation Details</p>
          <div className="grid grid-cols-2 gap-4  p-4 rounded-sm shadow-sm">
            <Form.Item label=" Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="enter name" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="contactNo"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter phone number" />
            </Form.Item>
          </div>
        </div>
        <Form.Item className="mt-6">
          <Button className=" w-full" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
