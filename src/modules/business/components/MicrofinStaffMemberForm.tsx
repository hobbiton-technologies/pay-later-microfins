import {
  BranchesData,
  useGetMicrofinBranchesRequestQuery,
} from "@/api/queries/summaryQueries";
import { Button, Form, FormInstance, Input, Select, Spin } from "antd";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";

type UserItemProps = {
  name: number;
  fieldKey: React.Key;
  index: number;
  form: FormInstance;
};

const UserItem: React.FC<UserItemProps> = ({ name, fieldKey }) => {
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

export const MicrofinStaffMemberForm = () => {
  const [id, setSearchId] = useState<number>(0);
  const [pageNumber] = useState<number | null>(1);
  const [pageSize] = useState(10);
  const [, setBranches] = useState<BranchesData[]>([]);
  const [form] = Form.useForm();

  const { data: branchesData, isFetching } = useGetMicrofinBranchesRequestQuery(
    {
      id: Number(localStorage.getItem("organizationId")),
      pageNumber: pageNumber ?? 1,
      pageSize: pageSize,
    }
  );

  const branchesDataSelect = branchesData?.data || [];

  useEffect(() => {
    if (branchesData) {
      setBranches(branchesData?.data || []);
    }
  }, [branchesData]);

  const handleSubmit = async (values: any) => {
    try {
      const userData = {};
    } catch (error) {}
  };

  return (
    <div className="">
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, marginTop: 24 }}
        className="grid grid-cols-1 gap-4"
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
          <div className=" grid grid-cols-1 gap-4 mb-4 shadow-sm p-4 rounded relative bg-white">
            <div>
              {" "}
              <p className=" font-semibold pb-2">Employee Details</p>
            </div>
            <div className=" grid grid-cols-2 gap-4">
              {" "}
              <Form.Item
                label="Branch"
                name="branchId"
                rules={[{ required: false }]}
              >
                <Select
                  placeholder="Select Branch"
                  loading={isFetching}
                  notFoundContent={
                    isFetching ? <Spin size="small" /> : "No Branch"
                  }
                >
                  {branchesDataSelect.map((branches: BranchesData) => (
                    <Option
                      key={String(branches.id)}
                      value={String(branches.id)}
                    >
                      {branches.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="ID Type"
                name="idType"
                rules={[{ required: false }]}
              >
                <Select placeholder="Select type" id="">
                  <Option value="Nome">None</Option>
                  <Option value="Nrc">NRC</Option>
                  <Option value="Passport">Passport</Option>
                  <Option value="DriversLicense">Drivers License</Option>
                </Select>
              </Form.Item>
              <Form.Item name="idNumber" label="ID Number">
                <Input placeholder="enter id number" />
              </Form.Item>
              <Form.Item name="employeeIdNumber" label="Employee ID Number">
                <Input placeholder="enter employee id number" />
              </Form.Item>
              <Form.Item name="position" label="Position">
                <Input placeholder="enter position" />
              </Form.Item>
            </div>
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
