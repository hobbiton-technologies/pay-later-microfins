import DocumentUploadComponent from "@/utils/DocumentUploadComponent";
import {
  App,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  Tooltip,
  UploadFile,
} from "antd";
import { useState } from "react";

export const MouProposalForm = () => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { RangePicker } = DatePicker;
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);

  const handleSubmit = () => {};
  return (
    <div className=" px-4">
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, marginTop: 24 }}
        className=" grid grid-cols-1 gap-4 items-center"
        onFinish={handleSubmit}
      >
        <div>
          <p className=" font-semibold pb-4">
            Complete the form below to propose an MOU.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              label="Propose start and end date"
              className="col-span-2"
              name="dateRange"
              rules={[{ required: true, message: "field is required" }]}
            >
              <RangePicker className="w-full" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              label={
                <Tooltip title="Select the day of the month when payroll will be processed.">
                  Set Payroll Run Date
                </Tooltip>
              }
              className="col-span-2"
              name="payrollRunDate"
              rules={[
                {
                  required: true,
                  message: "Please select the payroll run date.",
                },
              ]}
            >
              <Select placeholder="Select payroll run date">
                {Array.from({ length: 28 }, (_, i) => (
                  <Select.Option key={i + 1} value={i + 1}>
                    {i + 1}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              label="Upload MOU Document"
              name="mouDocument"
              className="text-left col-span-2"
            >
              <DocumentUploadComponent onUpload={setUploadedFiles} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              className="w-full"
              name="loanProductIds"
              rules={[
                {
                  required: true,
                  message: "Please select at least one loan product",
                },
              ]}
              label="Select Loan Product"
            >
              <Select
                mode="multiple"
                showSearch
                placeholder="Search Loan Product"
                optionFilterProp="label"
                // loading={loadProductsIsLoading}
                // options={loanProductOptions}
                // filterSort={(optionA, optionB) =>
                //   (optionA?.label ?? "")
                //     .toLowerCase()
                //     .localeCompare((optionB?.label ?? "").toLowerCase())
                // }
                style={{ flex: 1 }}
              />
            </Form.Item>

            <Form.Item
              className="w-full"
              name="organisationId"
              rules={[{ required: true, message: "field is required" }]}
              label="Select Organization"
            >
              <Select
                showSearch
                placeholder="Search Organization"
                optionFilterProp="label"
                // loading={isOrganizationsLoading}
                // options={organizationOptions}
                // filterSort={(optionA, optionB) =>
                //   (optionA?.label ?? "")
                //     .toLowerCase()
                //     .localeCompare((optionB?.label ?? "").toLowerCase())
                // }
              />
            </Form.Item>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="w-full p-2 bg-blue-950 rounded-lg text-white"
              //   disabled={isProposing}
            >
              Propose MOU
              {/* {isProposing ? "Proposing..." : "Propose MOU"} */}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};
