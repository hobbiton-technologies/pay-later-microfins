import { Button, Form } from "antd";
import { Check, CheckCheck } from "lucide-react";

export const AllocationForm = () => {
  const [form] = Form.useForm();
  return (
    <div>
      <Form className=" grid grid-cols-2 gap-2">
        <Form.Item className="mt-6">
          <Button
            className=" w-full items-center"
            type="primary"
            htmlType="submit"
          >
            <Check className=" w-4" /> Accept
          </Button>
        </Form.Item>
        <Form.Item className="mt-6 items-center">
          <Button
            style={{
              backgroundColor: "#dc143c",
              color: "#fff",
              border: "none",
            }}
            className=" bg-red-500 w-full border-gray-300 text-gray-700 hover:border-gray-400"
            htmlType="submit"
            danger
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className=" w-4"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            Reject
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
