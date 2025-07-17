import { MenuProps } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

export const MenuItems: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <PieChartOutlined />,
    children: [
      { key: "/", label: "Overview" },
      { key: "/products", label: "Products" },
    ],
  },
  {
    key: "business",
    label: "Business",
    icon: <DesktopOutlined />,
    children: [
      {
        key: "/branches",
        label: "Branches",
        style: { paddingRight: 20, backgroundImage: "inherit" },
      },
      { key: "/staff-members", label: "Staff Members" },
      { key: "/organisations", label: "Organisations" },
      { key: "/mous", label: "MOUs" },
    ],
  },
  {
    key: "massMarket",
    label: "Mass Markets",
    icon: <ContainerOutlined />,
    children: [
      { key: "/clients", label: "Clients" },
      { key: "/loans", label: "Loans" },
    ],
  },
  {
    key: "financials",
    label: "Financials",
    icon: <BarChartOutlined />,
    children: [
      { key: "/salary-loans", label: "Salary Loans" },
      { key: "/recovery-schedules", label: "Recovery Schedules" },
      { key: "/reporting", label: "Reporting" },
    ],
  },
];
