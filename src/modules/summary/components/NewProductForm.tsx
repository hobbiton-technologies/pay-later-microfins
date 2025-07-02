import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Input,
  message,
  Select,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

type ProductChargeItemProps = {
  name: number;
  fieldKey: React.Key;
  remove: (index: number | number[]) => void;
  index: number;
  form: FormInstance;
};

const ProductChargeItem: React.FC<ProductChargeItemProps> = ({
  name,
  fieldKey,
  remove,
  index,
  form,
}) => {
  const isProductChargesEnabled = Form.useWatch(
    ["loanProductCharges", name, "isProductCharges"],
    form
  );
  const calculateByRate = Form.useWatch(
    ["loanProductCharges", name, "calculateByRate"],
    form
  );

  return (
    <div
      key={fieldKey}
      className="grid grid-cols-1 gap-4 mb-4 shadow-sm p-4 rounded relative bg-white"
    >
      <div className="col-span-2 font-semibold text-sm mb-2">
        Loan Product Charge #{index + 1}
      </div>
      <div>
        <Form.Item name={[name, "isProductCharges"]} valuePropName="checked">
          <Checkbox>Product Charges</Checkbox>
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item name={[name, "name"]} label="Name">
            <Input
              placeholder="enter name"
              disabled={!isProductChargesEnabled}
            />
          </Form.Item>
          <div className="pt-6">
            <Form.Item
              name={[name, "calculateByRate"]}
              valuePropName="checked"
              className="pt-8"
            >
              <Checkbox disabled={!isProductChargesEnabled}>
                Calculate By Rate
              </Checkbox>
            </Form.Item>
          </div>
          <Form.Item name={[name, "amount"]} label="Amount">
            <Input
              placeholder="enter amount"
              disabled={!isProductChargesEnabled}
            />
          </Form.Item>
          <Form.Item name={[name, "rate"]} label="Rate">
            <Input
              placeholder="enter rate"
              disabled={!isProductChargesEnabled || !calculateByRate}
            />
          </Form.Item>

          {remove && (
            <Button
              type="text"
              icon={<MinusCircleOutlined />}
              onClick={() => remove(name)}
              className="absolute top-2 right-2 text-red-600"
              disabled={!isProductChargesEnabled}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const LoanDocumentItem: React.FC<ProductChargeItemProps> = ({
  name,
  fieldKey,
  remove,
  index,
  form,
}) => {
  const isLoanDocument = Form.useWatch(
    ["loanDocuments", name, "isLoanDocument"],
    form
  );

  return (
    <div
      key={fieldKey}
      className="grid grid-cols-1 gap-4 mb-4 shadow-sm p-4 rounded relative bg-white"
    >
      <div className="col-span-2 font-semibold text-sm mb-2">
        Loan Document #{index + 1}
      </div>
      <div>
        <Form.Item
          name={[name, "isLoanDocument"]}
          valuePropName="checked"
          rules={[{ required: false }]}
        >
          <Checkbox>Loan Document</Checkbox>
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item name={[name, "name"]} label="Name">
            <Input placeholder="enter name" disabled={!isLoanDocument} />
          </Form.Item>
          <div className="pt-6">
            <Form.Item
              name={[name, "isRequired"]}
              valuePropName="checked"
              className="pt-8"
            >
              <Checkbox disabled={!isLoanDocument}>Is Required</Checkbox>
            </Form.Item>
          </div>

          {remove && (
            <Button
              type="text"
              icon={<MinusCircleOutlined />}
              onClick={() => remove(name)}
              className="absolute top-2 right-2 text-red-600"
              disabled={!isLoanDocument}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const NewProductForm = () => {
  const [form] = Form.useForm();
  const calculateInterestByRate = Form.useWatch(
    "calculateInterestByRate",
    form
  );
  const calculatePenalty = Form.useWatch("calculatePenalty", form);
  const calculatePenaltyByRate = Form.useWatch("calculatePenaltyByRate", form);

  const productChargesList = Form.useWatch("loanProductCharges", form) || [];
  const isAnyProductChargeEnabled = productChargesList.some(
    (item: any) => item?.isProductCharges
  );

  const productDocumentList = Form.useWatch("loanDocuments", form) || [];
  const isAnyProductDocumentEnabled = productDocumentList.some(
    (item: any) => item?.isLoanDocument
  );

  const handleProductSubmit = async (values: {
    name: string;
    loanProductType: string;
    minimumLoanAmount: number;
    maximumLoanAmount: number;
    distributionChannels: string[];
    loanDisbursementTypes: string[];
    minimumRepaymentPeriod: number;
    maximumRepaymentPeriod: number;
    gracePeriodInDays: number;
    repaymentCycles: string[];
    calculateInterestByRate: boolean;
    minimumInterestRate: number;
    maximumInterestRate: number;
    minimumInterestAmount: number;
    maximumInterestAmount: number;
    interestType: string;
    calculatePenalty: boolean;
    calculatePenaltyByRate: boolean;
    penaltyRate: number;
    penaltyAmount: number;
    penaltyCalculationMethod: string;
    loanProductCharges: [
      {
        name: string;
        calculateByRate: boolean;
        amount: number;
        rate: number;
      }
    ];
    productStatus: string;
    isCollateralBased: boolean;
    loanDocuments: [
      {
        name: string;
        isRequired: boolean;
      }
    ];
    isMouBased: boolean;
    microfinBranches: number[];
  }) => {
    try {
      const transformedProductCharges =
        values.loanProductCharges?.map((l: any) => ({
          name: l.name,
          calculateByRate: l.calculateByRate,
          amount: l.amount,
          rate: l.amount,
        })) || [];

      const transformedLoadDocuments =
        values.loanDocuments?.map((lc: any) => ({
          name: lc.name,
          isRequired: lc.isRequired,
        })) || [];

      const loanProductData = {
        name: values.name,
        loanProductType: values.loanProductType,
        minimumLoanAmount: values.minimumLoanAmount,
        maximumLoanAmount: values.maximumLoanAmount,
        distributionChannels: values.distributionChannels,
        loanDisbursementTypes: values.loanDisbursementTypes,
        isCollateralBased: values.isCollateralBased,
        minimumRepaymentPeriod: values.minimumRepaymentPeriod,
        maximumRepaymentPeriod: values.maximumRepaymentPeriod,
        gracePeriodInDays: values.gracePeriodInDays,
        repaymentCycles: values.repaymentCycles,
        calculateInterestByRate: values.calculateInterestByRate,
        minimumInterestRate: values.minimumInterestRate,
        maximumInterestRate: values.maximumInterestRate,
        minimumInterestAmount: values.minimumInterestAmount,
        maximumInterestAmount: values.maximumInterestAmount,
        interestType: values.interestType,
        calculatePenalty: values.calculatePenalty,
        calculatePenaltyByRate: values.calculatePenaltyByRate,
        penaltyRate: values.penaltyRate,
        penaltyAmount: values.penaltyAmount,
        penaltyCalculationMethod: values.penaltyCalculationMethod,
        loanProductCharges: transformedProductCharges,
        productStatus: values.productStatus, //
        loanDocuments: transformedLoadDocuments,
        isMouBased: values.isMouBased, //
        microfinBranches: values.microfinBranches, //
      };
      console.log("Form values:", values);
      message.success("Product Successfully Created");
    } catch (error) {
      console.error("Failed to create Loan Product", error);
      message.error("Failed to create Loan Product");
    }
  };

  return (
    <div className=" px-4">
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, marginTop: 24 }}
        className=" grid grid-cols-1 gap-8 items-center"
        onFinish={handleProductSubmit}
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
              <Select placeholder="Select type" id="" mode="multiple">
                <Option value="1">Emergency Advance</Option>
                <Option value="2">Short Term Loan </Option>
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
                <Option value="1"> Ussd</Option>
                <Option value="2"> Web</Option>
                <Option value="3"> Mobile App</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Loan Disbursement Types"
              name="loanDisbursementTypes"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Disb Type" id="" mode="multiple">
                <Option value="1"> Bank</Option>
                <Option value="2"> Cash</Option>
                <Option value="3"> Mobile</Option>
                <Option value="4"> Other Transfer</Option>
              </Select>
            </Form.Item>
            <div className="">
              <Form.Item
                name="isCollateralBased"
                valuePropName="checked"
                rules={[{ required: false }]}
              >
                <Checkbox>Is Collateral Based</Checkbox>
              </Form.Item>
            </div>
          </div>
        </div>

        <div>
          <p className=" font-semibold pb-2 text-lg">Payment Period</p>{" "}
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
              rules={[{ required: false }]}
            >
              <Input placeholder="enter grace period" />
            </Form.Item>

            <Form.Item
              label="Repayment Cycles"
              name="repaymentCycles"
              rules={[{ required: false }]}
            >
              <Select placeholder="Select type" id="" mode="multiple">
                <Option value="1">Daily</Option>
                <Option value="2">Monthly</Option>
                <Option value="3">Quarterly</Option>
                <Option value="4">Yearly</Option>
                <Option value="5">LumpSum</Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className=" grid grid-cols-1 gap-4">
          <p className=" font-semibold text-lg">Interest Calculations</p>{" "}
          <div className="grid grid-cols-1 gap-4  p-4 rounded-sm shadow-sm items-center">
            <div className=" ">
              <div>
                <p className=" text-xs text-slate-600">
                  Check box to calculate by interest rate
                </p>
              </div>
              <div>
                <Form.Item
                  name="calculateInterestByRate"
                  valuePropName="checked"
                  className=" pt-8"
                >
                  <Checkbox>Calculate Interest By Rate</Checkbox>
                </Form.Item>
              </div>
            </div>
            <div className=" grid grid-cols-2 gap-2">
              {" "}
              <Form.Item
                label="Minimum Interest Rate"
                name="minimumInterestRate"
                rules={[{ required: false }]}
              >
                <Input
                  placeholder="enter minimum interest rate"
                  disabled={!calculateInterestByRate}
                />
              </Form.Item>
              <Form.Item
                label="Maximum Interest Rate"
                name="maximumInterestRate"
                rules={[{ required: false }]}
              >
                <Input
                  placeholder="enter maximum interest rate"
                  disabled={!calculateInterestByRate}
                />
              </Form.Item>
              <Form.Item
                label="Minimum Interest Amount"
                name="minimumInterestAmount"
                rules={[{ required: false }]}
              >
                <Input
                  placeholder="enter minimum interest amount"
                  disabled={calculateInterestByRate}
                />
              </Form.Item>
              <Form.Item
                label="Maximum Interest Amount"
                name="maximumInterestAmount"
                rules={[{ required: false }]}
              >
                <Input
                  placeholder="enter maximum interest amount"
                  disabled={calculateInterestByRate}
                />
              </Form.Item>{" "}
              <Form.Item
                label="Interest Type"
                name="interestType"
                rules={[{ required: false }]}
              >
                <Select placeholder="Select type" id="">
                  <Option value="1">Flat Rate </Option>
                  <Option value="2">Reducing Balance</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4   ">
          <p className=" font-semibold text-lg">Penalty Calculations</p>
          <div className=" grid grid-cols-1 gap-2 rounded-sm shadow-sm p-4">
            <div className=" ">
              <div>
                <p className=" text-xs text-slate-600">
                  Check box to calculate penalty
                </p>
              </div>
              <div>
                <Form.Item
                  name="calculatePenalty"
                  valuePropName="checked"
                  className=" pt-8"
                >
                  <Checkbox>Calculate Penalty</Checkbox>
                </Form.Item>
              </div>
            </div>
            <div className=" grid grid-cols-2 gap-4  ">
              <div className=" grid grid-cols-1 gap-2">
                <div>
                  <p className=" text-xs text-slate-600">
                    Check box to calculate penalty by rate
                  </p>
                </div>
                <div className=" ">
                  <Form.Item
                    name="calculatePenaltyByRate"
                    valuePropName="checked"
                    className=" "
                  >
                    <Checkbox disabled={!calculatePenalty}>
                      Calculate Penalty By Rate
                    </Checkbox>
                  </Form.Item>
                </div>
              </div>

              <Form.Item
                label="Penalty Amount"
                name="penaltyAmount"
                rules={[{ required: false }]}
              >
                <Input
                  placeholder="enter penalty amount"
                  disabled={!calculatePenaltyByRate}
                />
              </Form.Item>

              <Form.Item
                label="Penalty Rate"
                name="penaltyRate"
                rules={[{ required: false }]}
              >
                <Input
                  placeholder="enter penalty rate"
                  disabled={!calculatePenaltyByRate}
                />
              </Form.Item>

              <Form.Item
                label="Penalty Calculation Method"
                name="penaltyCalculationMethod"
                rules={[{ required: false }]}
              >
                <Select
                  placeholder="Select type"
                  id=""
                  disabled={!calculatePenaltyByRate}
                >
                  <Option value="1">Initial principle</Option>
                  <Option value="2">Outstanding principle</Option>
                  <Option value="3">Initial principle plus interest</Option>
                  <Option value="4">Outstanding principle plus interest</Option>
                  <Option value="5">Interest</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>

        {/* <div className=" grid grid-cols-1 gap-4">
          <div>
            <p className=" font-semibold text-lg">Other Charges</p>
          </div>
          <div className=" grid grid-cols-2 gap-4  p-4 rounded-sm shadow-sm items-center">
            <Form.Item
              label="Loan Product Name"
              name="loanProductName"
              rules={[{ required: false }]}
            >
              <Input placeholder="enter loan product name" />
            </Form.Item>
            <Form.Item
              label="Loan Product Amount"
              name="loanProductAmount"
              rules={[{ required: false }]}
            >
              <Input placeholder="enter loan product amount" />
            </Form.Item>
          </div>
        </div> */}

        <div className=" bg-gray-50  rounded">
          <h3 className="font-semibold  mb-2 text-lg">Loan Product Charges</h3>
          <Form.List name="loanProductCharges" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }, index) => (
                  <ProductChargeItem
                    key={key}
                    name={name}
                    fieldKey={key}
                    remove={remove}
                    index={index}
                    form={form}
                  />
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    disabled={!isAnyProductChargeEnabled}
                  >
                    Add Loan Product Charge
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>

        <div className=" bg-gray-50  rounded">
          <h3 className="font-semibold  mb-2 text-lg">Loan Product Document</h3>

          <Form.List name="loanDocuments" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }, index) => (
                  <LoanDocumentItem
                    key={key}
                    name={name}
                    fieldKey={key}
                    remove={remove}
                    index={index}
                    form={form}
                  />
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    disabled={!isAnyProductDocumentEnabled}
                  >
                    Add Loan Document
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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
