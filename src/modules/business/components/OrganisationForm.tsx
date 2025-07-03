import { Form } from "antd";
import { useState } from "react";

export const OrganisationForm = () => {
  const [pageNumber] = useState<number | null>(1);
  const [pageSize] = useState(10);
  const [form] = Form.useForm();

  return (
    <div className=" px-4">
      <Form></Form>
    </div>
  );
};
