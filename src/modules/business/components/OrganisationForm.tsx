import { Form } from "antd";
import { useState } from "react";

export const OrganisationForm = () => {
  const [pageNumber] = useState<number | null>(1);
  const [pageSize] = useState(10);
  const [form] = Form.useForm();

  return (
    <div className=" px-4">
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, marginTop: 24 }}
        className=" grid grid-cols-1 gap-8 items-center"
      >
        {" "}
        <p className=" font-semibold pb-2 text-lg">Organisation Details</p>
      </Form>
    </div>
  );
};
