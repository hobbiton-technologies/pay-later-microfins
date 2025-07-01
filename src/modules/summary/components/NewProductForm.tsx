import { Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";

export const NewProductForm = () => {
  const [form] = Form.useForm();
  return (
    <div className=" px-4">
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, marginTop: 24 }}
        className=" grid grid-cols-1 gap-8"
      >
        <div className="grid grid-cols-2 gap-4  p-4 rounded-sm shadow-sm">
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true }]}
          >
            <Input placeholder="enter product name" />
          </Form.Item>
          <Form.Item
            label="Product Type"
            name="institutionType"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select type" id="">
              <Option value="">Emergency Advance</Option>
              <Option value="">Short Term Loan </Option>
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
            <Select placeholder="Select Dist Channel" id="">
              <Option value=""> Ussd</Option>
              <Option value=""> Web</Option>
              <Option value=""> MobileApp</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Loan Disbursement Types"
            name="loanDisbursementTypes"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Disb Type" id="">
              <Option value=""> Bank</Option>
              <Option value=""> Cash</Option>
              <Option value=""> Mobile</Option>
              <Option value=""> Other Transfer</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4  p-4 rounded-sm shadow-sm">
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true }]}
          >
            <Input placeholder="enter product name" />
          </Form.Item>
          <Form.Item
            label="Product Type"
            name="institutionType"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select type" id="">
              <Option value="">Emergency Advance</Option>
              <Option value="">Short Term Loan </Option>
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
            <Select placeholder="Select Dist Channel" id="">
              <Option value=""> Ussd</Option>
              <Option value=""> Web</Option>
              <Option value=""> MobileApp</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Loan Disbursement Types"
            name="loanDisbursementTypes"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Disb Type" id="">
              <Option value=""> Bank</Option>
              <Option value=""> Cash</Option>
              <Option value=""> Mobile</Option>
              <Option value=""> Other Transfer</Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
