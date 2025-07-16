import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  message,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  MicrofinOrgLoansBody,
  useCreateMicrofinOrgLoanMutation,
} from "@/api/mutations/loansMutation";

type ItemProps = {
  name: number;
  fieldKey: React.Key;
  index: number;
  form: FormInstance;
};

type MicrofinOrgLoansFormProps = {
  microfinMemberId: number;
  microfinOrganisationId?: number;
};

const DocumetItem: React.FC<ItemProps> = ({ name, fieldKey }) => {
  return (
    <div
      key={fieldKey}
      className=" grid grid-cols-1 shadow-sm p-4 rounded relative bg-white"
    >
      <div>
        {" "}
        <p className=" font-semibold pb-2">Document Details</p>
      </div>
      <div className=" grid grid-cols-2 gap-4 relative bg-white">
        <Form.Item name={[name, "name"]} label="Name">
          <Input placeholder="enter document name" />
        </Form.Item>
        <Form.Item name={[name, "lastName"]} label="Upload Document">
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </div>
    </div>
  );
};

export const MicrofinOrgLoansForm: React.FC<MicrofinOrgLoansFormProps> = ({
  microfinMemberId,
  microfinOrganisationId,
}) => {
  const [form] = Form.useForm();
  const [loadDataSubmit] = useCreateMicrofinOrgLoanMutation();

  const handleSubmit = async (values: any) => {
    try {
      const documentData =
        Array.isArray(values.documents) &&
        values.documents.length > 0 &&
        values.documents.some((d: any) => d.name || d.document)
          ? values.documents.map((d: any) => ({
              name: d.name || "",
              document: d.document || "",
            }))
          : null;

      const organizationId = Number(localStorage.getItem("organizationId"));

      const microfinOrgLoanData: MicrofinOrgLoansBody = {
        amount: values.amount || "",
        interestRate: values.interestRate || "",
        penaltyRate: values.penaltyRate || "",
        penaltyCalculationMethod: values.penaltyCalculationMethod || "",
        documents: documentData || null,
        startDate: values.startDate || "",
        duration: values.duration || "",
      };

      await loadDataSubmit({
        organizationId,
        microfinOrganisationId: microfinOrganisationId,
        microfinMemberId,
        microfinOrgLoanData,
      });
      // console.log(microfinOrganisationId);
      message.success("Microfin Organisation loan Successfully Created");
      form.resetFields();
    } catch (error) {
      console.error("Failed to create Microfin Organisation loan ", error);
    }
  };
  return (
    <div className="">
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, marginTop: 24 }}
        className="grid grid-cols-1 gap-4"
        onFinish={handleSubmit}
      >
        <div className=" grid grid-cols-1 items-center">
          <div className=" grid grid-cols-1 gap-4 mb-4 shadow-sm p-4 rounded relative bg-white">
            <div>
              {" "}
              <p className=" font-semibold pb-2">Loan Details</p>
            </div>
            <div className=" grid grid-cols-2 gap-4">
              {" "}
              <Form.Item name="amount" label="Amount">
                <Input placeholder="enter amount" />
              </Form.Item>
              <Form.Item name="interestRate" label="Interest Rate">
                <Input placeholder="enter interest rate" />
              </Form.Item>
              <Form.Item name="penaltyRate" label="Penalty Rate">
                <Input placeholder="enter penalty rate" />
              </Form.Item>
              <Form.Item
                name="penaltyCalculationMethod"
                label="Penalty Calculation Method"
              >
                <Input placeholder="enter penalty calculation method" />
              </Form.Item>
              <Form.Item name="startDate" label="Start Date">
                <DatePicker className=" w-full" />
              </Form.Item>
              <Form.Item name="duration" label="Duration">
                <Input placeholder="enter duration" />
              </Form.Item>
            </div>
          </div>
          <div>
            <Form.List name="documents" initialValue={[{}]}>
              {(fields) => (
                <>
                  {fields.map(({ key, name }, index) => (
                    <DocumetItem
                      key={key}
                      name={name}
                      fieldKey={key}
                      index={index}
                      form={form}
                    />
                  ))}
                </>
              )}
            </Form.List>
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
