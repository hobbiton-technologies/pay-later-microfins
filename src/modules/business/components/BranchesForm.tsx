import {
  BranchesData,
  useCreateBranchMutation,
} from "@/api/mutations/branchMutations";
import {
  OrganisationData,
  useGetOrganisationsRequestQuery,
} from "@/api/queries/summaryQueries";
import { Button, Form, Input, message, Select, Spin } from "antd";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";

export const BranchesForm = () => {
  const [pageNumber] = useState<number | null>(1);
  const [pageSize] = useState(10);
  const [form] = Form.useForm();
  const [, setMicrofinOrganisations] = useState<OrganisationData[]>();

  const [createBranch] = useCreateBranchMutation();

  const { data: organisationData, isFetching } =
    useGetOrganisationsRequestQuery({
      id: Number(localStorage.getItem("organizationId")),
      pageNumber: pageNumber ?? 1,
      pageSize: pageSize,
    });

  useEffect(() => {
    if (organisationData) {
      setMicrofinOrganisations(organisationData?.data || []);
    }
  }, [organisationData]);

  // console.log("Organisation Data", organisationData?.data);

  const organisationDataSelect = organisationData?.data || [];

  const handleSubmit = async (values: {
    microfinId: number;
    name: string;
    address: string;
    phoneNumber: string;
    branchId: string;
  }) => {
    try {
      const organizationId = Number(localStorage.getItem("organizationId"));
      const branchData: BranchesData = {
        microfinId: values.microfinId,
        name: values.name,
        address: values.address,
        phoneNumber: values.phoneNumber,
        branchId: values.branchId,
      };

      await createBranch({ branchData, organizationId }).unwrap();
      message.success("Branch Successfully Created");

      form.resetFields();
    } catch (error) {
      console.error("Failed to create Branch", error);
    }
  };
  return (
    <div className=" px-4">
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, marginTop: 24 }}
        className=" grid grid-cols-1 gap-8 items-center"
        onFinish={handleSubmit}
      >
        <div>
          <p className=" font-semibold pb-2 text-lg">Branch Details</p>
          <div className="grid grid-cols-2 gap-4  p-4 rounded-sm shadow-sm">
            <Form.Item label="Microfin">
              <Select
                placeholder="Select Microfin"
                loading={isFetching}
                notFoundContent={
                  isFetching ? <Spin size="small" /> : "No Microfin"
                }
              >
                {organisationDataSelect.map(
                  (organisation: OrganisationData) => (
                    <Option
                      key={String(organisation.microfin.id)}
                      value={String(organisation.microfin.id)}
                    >
                      {organisation.microfin.name}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
            <Form.Item label=" Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="enter name" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter address" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter phone number" />
            </Form.Item>
            <Form.Item
              label="Branch ID"
              name="branchId"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter max loan amount" />
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
