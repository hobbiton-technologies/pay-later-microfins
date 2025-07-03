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
import {
  ProductsBody,
  useCreateLoadProductMutation,
} from "@/api/mutations/productsMutation";

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

  const [productData] = useCreateLoadProductMutation();

  const handleProductSubmit = async (values: any) => {
    try {
      console.log("Raw form values:", values);

      const transformedProductCharges =
        values.loanProductCharges
          ?.filter((charge: any) => charge?.isProductCharges) // Only include enabled charges
          .map((l: any) => ({
            name: l.name || "",
            calculateByRate: Boolean(l.calculateByRate),
            amount: Number(l.amount) || 0,
            rate: Number(l.rate) || 0,
          })) || [];

      const transformedLoanDocuments =
        values.loanDocuments
          ?.filter((doc: any) => doc?.isLoanDocument) // Only include enabled documents
          .map((lc: any) => ({
            name: lc.name || "",
            isRequired: Boolean(lc.isRequired),
          })) || [];

      const organizationId = Number(localStorage.getItem("organizationId"));

      if (!organizationId) {
        message.error("Organization ID not found");
        return;
      }

      const loanProductData: ProductsBody = {
        name: values.name || "",
        loanProductType: values.loanProductType || "",
        minimumLoanAmount: Number(values.minimumLoanAmount) || 0,
        maximumLoanAmount: Number(values.maximumLoanAmount) || 0,
        distributionChannels: values.distributionChannels || [],
        loanDisbursementTypes: values.loanDisbursementTypes || [],
        isCollateralBased: Boolean(values.isCollateralBased),
        minimumRepaymentPeriod: Number(values.minimumRepaymentPeriod) || 0,
        maximumRepaymentPeriod: Number(values.maximumRepaymentPeriod) || 0,
        gracePeriodInDays: Number(values.gracePeriodInDays) || 0,
        repaymentCycles: values.repaymentCycles || [],
        calculateInterestByRate: Boolean(values.calculateInterestByRate),
        minimumInterestRate: Number(values.minimumInterestRate) || 0,
        maximumInterestRate: Number(values.maximumInterestRate) || 0,
        minimumInterestAmount: Number(values.minimumInterestAmount) || 0,
        maximumInterestAmount: Number(values.maximumInterestAmount) || 0,
        interestType: values.interestType || "",
        calculatePenalty: Boolean(values.calculatePenalty),
        calculatePenaltyByRate: Boolean(values.calculatePenaltyByRate),
        penaltyRate: Number(values.penaltyRate) || 0,
        penaltyAmount: Number(values.penaltyAmount) || 0,
        penaltyCalculationMethod: values.penaltyCalculationMethod || "",
        loanProductCharges: transformedProductCharges,
        productStatus: values.productStatus || "",
        loanDocuments: transformedLoanDocuments,
        isMouBased: Boolean(values.isMouBased),
        microfinBranches: values.microfinBranches || [],
      };

      console.log("Transformed data:", loanProductData);
      console.log("Product charges:", transformedProductCharges);
      console.log("Loan documents:", transformedLoanDocuments);

      const response = await productData({
        organizationId,
        loanProductData,
      }).unwrap();

      console.log("API Response:", response);
      message.success("Product Successfully Created");

      form.resetFields();
    } catch (error: any) {
      console.error("Failed to create Loan Product", error);

      if (error?.data?.message) {
        message.error(`Failed to create Loan Product: ${error.data.message}`);
      } else if (error?.message) {
        message.error(`Failed to create Loan Product: ${error.message}`);
      } else {
        message.error("Failed to create Loan Product");
      }
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
              <Select placeholder="Select type" id="">
                <Option value="Emergency Advance">Emergency Advance</Option>
                <Option value="Short Term Loan">Short Term Loan </Option>
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
                <Option value="Other Transfer"> Other Transfer</Option>
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
                <Option value="Daily">Daily</Option>
                <Option value="Monthly">Monthly</Option>
                <Option value="Quarterly">Quarterly</Option>
                <Option value="Yearly">Yearly</Option>
                <Option value="LumpSum">LumpSum</Option>
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
                  <Option value="Flat Rate">Flat Rate </Option>
                  <Option value="Reducing Balance">Reducing Balance</Option>
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
                  <Option value="Initial principle">Initial principle</Option>
                  <Option value="Outstanding principle">
                    Outstanding principle
                  </Option>
                  <Option value="Initial principle plus interest">
                    Initial principle plus interest
                  </Option>
                  <Option value="Outstanding principle plus interest">
                    Outstanding principle plus interest
                  </Option>
                  <Option value="Interest">Interest</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>

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

        <div className=" grid grid-cols-1 gap-4">
          <div>
            <p className=" font-semibold text-lg">Others</p>
          </div>
          <div className=" grid grid-cols-2 gap-4  p-4 rounded-sm shadow-sm items-center">
            <Form.Item
              label="Product Status"
              name="productStatus"
              rules={[{ required: false }]}
            >
              <Input placeholder="enter loan product name" />
            </Form.Item>
            <div className=" pt-6">
              <Form.Item
                name="isMouBased"
                valuePropName="checked"
                rules={[{ required: false }]}
              >
                <Checkbox>Is MOU Based</Checkbox>
              </Form.Item>
            </div>
            <Form.Item
              label="Microfin Branches"
              name="microfinBranches"
              rules={[{ required: false }]}
            >
              <Select placeholder="Select type" id="" mode="multiple">
                <Option value="20">Branch 1</Option>
                <Option value="2">Branch 2</Option>
                <Option value="3">Branch 3</Option>
                <Option value="4">Branch 4</Option>
                <Option value="5">Branch 5</Option>
              </Select>
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
