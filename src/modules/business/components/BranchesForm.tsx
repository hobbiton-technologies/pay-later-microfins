import {
  OrganisationData,
  useGetOrganisationsRequestQuery,
} from "@/api/queries/summaryQueries";
import { Button, Checkbox, Form, Input, Select, Spin } from "antd";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";

export const BranchesForm = () => {
  const [pageNumber] = useState<number | null>(1);
  const [pageSize] = useState(10);
  const [form] = Form.useForm();
  const [, setMicrofinOrganisations] = useState<OrganisationData[]>();

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

  const organisationDataSelect = organisationData?.data || [];
  return (
    <div className=" px-4">
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 1000, marginTop: 24 }}
        className=" grid grid-cols-1 gap-8 items-center"
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
              ></Select>
              {organisationDataSelect.map((organisation: OrganisationData) => (
                <Option
                  key={String(organisation.id)}
                  value={String(organisation.id)}
                >
                  {organisation.name}
                </Option>
              ))}
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
