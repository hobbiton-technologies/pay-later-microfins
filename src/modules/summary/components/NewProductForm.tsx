import { Button, Checkbox, Form, Input, Select } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
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
            label="Minimum Repayment Period"
            name="minimumRepaymentPeriod"
            rules={[{ required: false }]}
          >
            <Input placeholder="enter repayment period" />
          </Form.Item>

          <Form.Item
            label="Maximum Repayment Period"
            name="maximumRepaymentPeriod"
            rules={[{ required: false }]}
          >
            <Input placeholder="enter repayment period" />
          </Form.Item>

          <Form.Item
            label="Grace Period InDays"
            name="gracePeriodInDays"
            rules={[{ required: true }]}
          >
            <Input placeholder="enter grace period" />
          </Form.Item>

          <Form.Item
            label="Repayment Cycles"
            name="repaymentCycles"
            rules={[{ required: false }]}
          >
            <Select placeholder="Select type" id="">
              <Option value="">Daily</Option>
              <Option value="">Monthly</Option>
              <Option value="">Quarterly</Option>
              <Option value="">Yearly</Option>
              <Option value="">LumpSum</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4  p-4 rounded-sm shadow-sm items-center">
          <Form.Item
            label="Minimum Interest Rate"
            name="minimumInterestRate"
            rules={[{ required: false }]}
          >
            <Input placeholder="enter minimum interest rate" />
          </Form.Item>
          <Form.Item
            label="Maximum Interest Rate"
            name="maximumInterestRate"
            rules={[{ required: true }]}
          >
            <Input placeholder="enter maximum interest rate" />
          </Form.Item>
          <Form.Item
            label="Minimum Interest Amount"
            name="minimumInterestAmount"
            rules={[{ required: false }]}
          >
            <Input placeholder="enter minimum interest amount" />
          </Form.Item>
          <Form.Item
            label="Maximum Interest Amount"
            name="maximumInterestAmount"
            rules={[{ required: true }]}
          >
            <Input placeholder="enter maximum interest amount" />
          </Form.Item>{" "}
          <Form.Item
            label="Interest Type"
            name="interestType"
            rules={[{ required: false }]}
          >
            <Select placeholder="Select type" id="">
              <Option value="">FlatRate </Option>
              <Option value="">ReducingBalance</Option>
            </Select>
          </Form.Item>
          <div className=" pt-6">
            <Form.Item
              name="calculateInterestByRate"
              valuePropName="checked"
              className=" pt-8"
            >
              <Checkbox>Calculate Interest By Rate</Checkbox>
            </Form.Item>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4  p-4 rounded-sm shadow-sm items-center">
          <Form.Item
            label="Penalty Rate"
            name="penaltyRate"
            rules={[{ required: false }]}
          >
            <Input placeholder="enter penalty rate" />
          </Form.Item>
          <Form.Item
            label="Penalty Amount"
            name="penaltyAmount"
            rules={[{ required: true }]}
          >
            <Input placeholder="enter penalty amount" />
          </Form.Item>

          <div className=" pt-6">
            <Form.Item
              name="calculatePenalty"
              valuePropName="checked"
              className=" pt-8"
            >
              <Checkbox>Calculate Penalty</Checkbox>
            </Form.Item>
          </div>

          <div className=" pt-6">
            <Form.Item
              name="calculatePenaltyByRate"
              valuePropName="checked"
              className=" pt-8"
            >
              <Checkbox>Calculate Penalty By Rate</Checkbox>
            </Form.Item>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4  p-4 rounded-sm shadow-sm items-center">
          <Form.Item
            label="Loan Product Charges"
            name="loanProductCharges"
            rules={[{ required: false }]}
          >
            <Input placeholder="enter loan product charges" />
          </Form.Item>
          <Form.Item
            label="Loan Product Charges"
            name="loanProductCharges"
            rules={[{ required: false }]}
          >
            <Input placeholder="enter loan product charges" />
          </Form.Item>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-lg mb-2">Loan Product Charges</h3>
          <Form.List name="contactPersons" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <div
                    key={key}
                    className="grid grid-cols-2 gap-4 mb-4 shadow-sm p-4 rounded relative bg-white"
                  >
                    <div className="col-span-2 font-semibold text-sm mb-2">
                      Loan Product Charge {index + 1}
                    </div>
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      label="Name"
                      rules={[{ required: false }]}
                    >
                      <Input placeholder="enter name" />
                    </Form.Item>
                    <div className=" pt-6">
                      <Form.Item
                        name="calculateByRate"
                        valuePropName="checked"
                        className=" pt-8"
                      >
                        <Checkbox>Calculate By Rate</Checkbox>
                      </Form.Item>
                    </div>
                    <Form.Item
                      {...restField}
                      name={[name, "amount"]}
                      label="Amount"
                      rules={[{ required: false }]}
                    >
                      <Input placeholder="enter amount" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "rate"]}
                      label="Rate"
                      rules={[{ required: false }]}
                    >
                      <Input placeholder="enter rate" />
                    </Form.Item>

                    {fields.length > 1 && (
                      <Button
                        type="text"
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                        className="absolute top-2 right-2 text-red-600"
                      />
                    )}
                  </div>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Loan Product Charge
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
      </Form>
    </div>
  );
};
