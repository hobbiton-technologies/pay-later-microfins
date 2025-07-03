import { Button, Checkbox, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";

export const BranchesForm = () => {
  const [form] = Form.useForm();

  return (
    <div className=" px-4">
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, marginTop: 24 }}
        className=" grid grid-cols-1 gap-8 items-center"
      >
        <div>
          <p className=" font-semibold pb-2 text-lg">Loan Details</p>
          <div className="grid grid-cols-2 gap-4  p-4 rounded-sm shadow-sm">
            <Form.Item
              label="Product Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter product name" />
            </Form.Item>
            <Form.Item
              label="Product Type"
              name="loanProductType"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select type" id="">
                <Option value="EmergencyAdvance">Emergency Advance</Option>
                <Option value="ShortTermLoan">Short Term Loan </Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Minimum Loan Amount"
              name="minimumLoanAmount"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter min loan amount" />
            </Form.Item>
            <Form.Item
              label="Maxmimum Loan Amount"
              name="maximumLoanAmount"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter max loan amount" />
            </Form.Item>
            <Form.Item
              label="Distribution Channels"
              name="distributionChannels"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Dist Channel" id="" mode="multiple">
                <Option value="Ussd"> Ussd</Option>
                <Option value="Web"> Web</Option>
                <Option value="Mobile App"> Mobile App</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Loan Disbursement Types"
              name="loanDisbursementTypes"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Disb Type" id="" mode="multiple">
                <Option value="Bank"> Bank</Option>
                <Option value="Cash"> Cash</Option>
                <Option value="Mobile"> Mobile</Option>
                <Option value="OtherTransfer"> Other Transfer</Option>
              </Select>
            </Form.Item>
            <div className=" pt-6">
              <Form.Item
                name="isCollateralBased"
                valuePropName="checked"
                rules={[{ required: false }]}
              >
                <Checkbox>Is Collateral Based</Checkbox>
              </Form.Item>
            </div>
            <Form.Item
              label="Other Transfer"
              name="otherTranfer"
              rules={[{ required: false }]}
            >
              <Input disabled placeholder="enter max loan amount" />
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
