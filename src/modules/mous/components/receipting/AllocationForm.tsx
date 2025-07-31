import {
  useAcceptAllocationMutation,
  useRejectAllocationMutation,
} from "@/api/mutations/mouMutation";
import { App, Button, Form, Input, Modal } from "antd";
import { Check } from "lucide-react";
import { useState } from "react";

type AllocationFormProps = {
  receiptId: number;
};

export const AllocationForm = ({ receiptId }: AllocationFormProps) => {
  const [acceptForm] = Form.useForm();
  const [rejectForm] = Form.useForm();
  const { message } = App.useApp();
  const [isAcceptModalVisible, setAcceptModaVisible] = useState<boolean>(false);
  const [isRejectModalVisible, setRejectModaVisible] = useState<boolean>(false);

  const handleAcceptAllocation = () => {
    setAcceptModaVisible(true);
  };

  const handleRecjectAllocation = () => {
    setRejectModaVisible(true);
  };

  const [acceptAllocation, { isLoading: acceptIsLoading }] =
    useAcceptAllocationMutation();
  const [rejectAllocation, { isLoading: rejectIsLoading }] =
    useRejectAllocationMutation();
  return (
    <div>
      <Form className=" grid grid-cols-2 gap-2">
        <Form.Item className="mt-6">
          <Button
            onClick={handleAcceptAllocation}
            className=" w-full items-center"
            type="primary"
            htmlType="submit"
          >
            <Check className=" w-4" /> Accept
          </Button>
        </Form.Item>

        <Form.Item className="mt-6 items-center">
          <Button
            onClick={handleRecjectAllocation}
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

        {/* Accept Modal */}
        <Modal
          centered
          open={isAcceptModalVisible}
          onCancel={() => setAcceptModaVisible(false)}
          confirmLoading={acceptIsLoading}
          onOk={() => {
            acceptForm.submit();
          }}
          okText="Confirm Accept"
        >
          <Form
            className=" grid grid-cols-1"
            form={acceptForm}
            onFinish={async (values) => {
              const { Remark } = values;
              try {
                await acceptAllocation({
                  id: Number(localStorage.getItem("organizationId")),
                  receiptId: receiptId,
                  remark: Remark,
                }).unwrap();
                message.success("Receipt Allocation Successful");
                setAcceptModaVisible(false);
              } catch (error) {
                message.error("Something went wrong");
              }
            }}
          >
            <div className=" pb-4">
              <p>Confirm Acceptance</p>
            </div>
            <Form.Item
              className=" grid grid-cols-1"
              name="Remark"
              label="Remark"
              rules={[{ required: true }]}
            >
              <Input.TextArea placeholder="Enter remark" />
            </Form.Item>
          </Form>
        </Modal>

        {/* Reject Modal */}
        <Modal
          centered
          open={isRejectModalVisible}
          confirmLoading={rejectIsLoading}
          onCancel={() => setRejectModaVisible(false)}
          onOk={() => {
            rejectForm.submit();
          }}
          okText="Confirm Reject"
          okButtonProps={{
            style: {
              backgroundColor: "#dc143c",
              borderColor: "#dc143c",
              color: "#fff",
            },
          }}
        >
          <Form
            className=" grid grid-cols-1"
            form={rejectForm}
            onFinish={async (values) => {
              const { Remark } = values;
              try {
                await rejectAllocation({
                  id: Number(localStorage.getItem("organizationId")),
                  receiptId: receiptId,
                  remark: Remark,
                }).unwrap();
                message.success("Receipt Rejection Successful");
                setAcceptModaVisible(false);
              } catch (error) {
                message.error("Something went wrong");
              }
            }}
          >
            <div className=" pb-4">
              <p>Confirm Rejection</p>
            </div>
            <Form.Item
              className=" grid grid-cols-1"
              name="Remark"
              label="Remark"
              rules={[{ required: true }]}
            >
              <Input.TextArea placeholder="Enter remark" />
            </Form.Item>
          </Form>
        </Modal>
      </Form>
    </div>
  );
};
