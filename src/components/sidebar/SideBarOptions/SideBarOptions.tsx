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
      { key: "/", label: "Products" },
    ],
  },
  {
    key: "business",
    label: "Business",
    icon: <DesktopOutlined />,
    children: [
      { key: "/", label: "Business" },
      { key: "/", label: "Organisations" },
      { key: "/", label: "MOUs" },
    ],
  },
  {
    key: "moneylenders",
    label: "Money Lenders",
    icon: <ContainerOutlined />,
    children: [
      { key: "/", label: "Clients" },
      { key: "/", label: "Loans" },
    ],
  },
  {
    key: "financials",
    label: "Financials",
    icon: <BarChartOutlined />,
    children: [
      { key: "/", label: "Salary Loans" },
      { key: "/", label: "Reccovery Schedules" },
      { key: "/", label: "Reporting" },
    ],
  },
];
