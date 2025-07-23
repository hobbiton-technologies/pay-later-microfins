import { Card, Descriptions, Divider } from "antd";
import { MouOrganisationsStats } from "./MouOrganisationDetailsStats";
import { MouLoansOrganisationData } from "@/api/queries/organisationQueries";

interface MouOrganisationProps {
  mouorganisationId: MouLoansOrganisationData;
}

export default function MouOrganisationOverviewPage({
  mouorganisationId,
}: MouOrganisationProps) {
  const labelStyle = { width: "200px" };
  return (
    <div className=" grid grid-cols-1 gap-8">
      <MouOrganisationsStats />
      <Card bordered={false} className="mt-10">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Organization ID" labelStyle={labelStyle}>
            {mouorganisationId?.id}
          </Descriptions.Item>
          <Descriptions.Item label="Name" labelStyle={labelStyle}>
            {mouorganisationId?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Contact Number" labelStyle={labelStyle}>
            {mouorganisationId?.contactNo}
          </Descriptions.Item>
          <Descriptions.Item label="Email" labelStyle={labelStyle}>
            {mouorganisationId?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Address" labelStyle={labelStyle}>
            {mouorganisationId?.address}
          </Descriptions.Item>
        </Descriptions>

        <Divider />
      </Card>
    </div>
  );
}
