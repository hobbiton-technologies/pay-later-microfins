import { Button, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";

export const MicrofinOrgLoansForm = () => {
  const [form] = Form.useForm();
  return (
    <div className="">
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, marginTop: 24 }}
        className="grid grid-cols-1 gap-4"
        // onFinish={handleSubmit}
      >
        <div className=" grid grid-cols-1 gap-8 items-center">
          <div>
            {/* <Form.List name="document" initialValue={[{}]}>
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
            </Form.List> */}
          </div>
          <div className=" grid grid-cols-1 gap-4 mb-4 shadow-sm p-4 rounded relative bg-white">
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
