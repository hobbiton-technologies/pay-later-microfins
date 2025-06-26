import { MenuProps } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

export const MenuItems: MenuItem[] = [
  {
    key: "general",
    label: "General",
    icon: <PieChartOutlined />,
    children: [{ key: "/", label: "Summary" }],
  },
];
