import {
  MicrofinOrgStaffBody,
  useCreateMicrofinOrgStaffMemberMutation,
} from "@/api/mutations/staffMutation";
import { Button, Form, FormInstance, Input, message, Select } from "antd";
import { Option } from "antd/es/mentions";

type ItemProps = {
  name: number;
  fieldKey: React.Key;
  index: number;
  form: FormInstance;
};

type MicrofinOrgStaffMemberFormProps = {
  microfinOrganisationId: number;
};

const UserItem: React.FC<ItemProps> = ({ name, fieldKey }) => {
  return (
    <div
      key={fieldKey}
      className=" grid grid-cols-1 shadow-sm p-4 rounded relative bg-white"
    >
      <div>
        {" "}
        <p className=" font-semibold pb-2">Personal Details</p>
      </div>
      <div className=" grid grid-cols-2 gap-4 relative bg-white">
        <Form.Item name={[name, "firstName"]} label="First Name">
          <Input placeholder="enter first name" />
        </Form.Item>
        <Form.Item name={[name, "lastName"]} label="Last Name">
          <Input placeholder="enter last name" />
        </Form.Item>
        <Form.Item name={[name, "phoneNumber"]} label="Phone Number">
          <Input placeholder="enter last name" />
        </Form.Item>
        <Form.Item name={[name, "email"]} label="Email">
          <Input placeholder="enter email" />
        </Form.Item>
        <Form.Item name={[name, "password"]} label="Password">
          <Input placeholder="enter password" />
        </Form.Item>
        <Form.Item name={[name, "passwordConfirm"]} label="Confirm Password">
          <Input placeholder="enter password confirmation" />
        </Form.Item>
      </div>
    </div>
  );
};

const BankItem: React.FC<ItemProps> = ({ name, fieldKey }) => {
  return (
    <div
      key={fieldKey}
      className=" grid grid-cols-1 shadow-sm p-4 rounded relative bg-white"
    >
      <div>
        {" "}
        <p className=" font-semibold pb-2">Bank Details</p>
      </div>
      <div className=" grid grid-cols-2 gap-4 relative bg-white">
        <Form.Item name={[name, "name"]} label="Name">
          <Input placeholder="enter bank name" />
        </Form.Item>
        <Form.Item name={[name, "branch"]} label="Branch">
          <Input placeholder="enter bank branch " />
        </Form.Item>
        <Form.Item name={[name, "code"]} label="Code">
          <Input placeholder="enter bank code" />
        </Form.Item>
        <Form.Item name={[name, "accaccountNumber"]} label="Account Number">
          <Input placeholder="enter account number" />
        </Form.Item>
      </div>
    </div>
  );
};

export const MicrofinOrgStaffMemberForm: React.FC<
  MicrofinOrgStaffMemberFormProps
> = ({ microfinOrganisationId }) => {
  const [form] = Form.useForm();
  const [orgStaffMemberData] = useCreateMicrofinOrgStaffMemberMutation();

  const handleSubmit = async (values: any) => {
    try {
      const u = values.user?.[0];
      const b = values.bank?.[0];

      const userData = {
        firstName: u?.firstName || "",
        lastName: u?.lastName || "",
        phoneNumber: u?.phoneNumber || "",
        email: u?.email || "",
        password: u?.password || "",
        passwordConfirm: u?.passwordConfirm,
      };

      const bankData = {
        name: b?.name || "",
        branch: b?.branch || "",
        code: b?.email || "",
        accountNumber: b?.accountNumber || "",
      };
      const organizationId = Number(localStorage.getItem("organizationId"));

      const microfinStaffMemberData: MicrofinOrgStaffBody = {
        user: userData,
        idType: values.idType,
        idNumber: values.idNumber,
        position: values.position,
        bankDetails: bankData,
      };

      await orgStaffMemberData({
        organizationId,
        microfinOrganisationId,
        microfinStaffMemberData,
      }).unwrap();

      // console.log("Staff Member: ", microfinStaffMemberData);
      message.success("Microfin Organisation member Successfully Created");
      form.resetFields();
    } catch (error) {
      console.error("Failed to create Staff Member", error);
    }
  };
  return (
    <div className=" pt-4">
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, marginTop: 24 }}
        className="grid grid-cols-1 gap-4"
        onFinish={handleSubmit}
      >
        <div className=" grid grid-cols-1 gap-8 items-center">
          <div>
            <Form.List name="user" initialValue={[{}]}>
              {(fields) => (
                <>
                  {fields.map(({ key, name }, index) => (
                    <UserItem
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

          <div className=" grid grid-cols-1 gap-4 shadow-sm p-4 rounded relative bg-white">
            <div>
              {" "}
              <p className=" font-semibold pb-2">Employee Details</p>
            </div>
            <div className=" grid grid-cols-2 gap-4">
              {" "}
              <Form.Item
                label="ID Type"
                name="idType"
                rules={[{ required: false }]}
              >
                <Select placeholder="Select type" id="">
                  <Option value="None">None</Option>
                  <Option value="Nrc">NRC</Option>
                  <Option value="Passport">Passport</Option>
                  <Option value="DriversLicense">Drivers License</Option>
                </Select>
              </Form.Item>
              <Form.Item name="idNumber" label="ID Number">
                <Input placeholder="enter id number" />
              </Form.Item>
              <Form.Item name="position" label="Position">
                <Input placeholder="enter position" />
              </Form.Item>
            </div>
          </div>

          <div>
            <Form.List name="user" initialValue={[{}]}>
              {(fields) => (
                <>
                  {fields.map(({ key, name }, index) => (
                    <BankItem
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
