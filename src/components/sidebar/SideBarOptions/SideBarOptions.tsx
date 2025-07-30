import { MenuProps } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  BarChartOutlined,
  BranchesOutlined,
  UserOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
  FileProtectOutlined,
  FolderOpenOutlined,
  AuditOutlined,
  FileDoneOutlined,
  ProjectOutlined,
  CreditCardOutlined,
  BookOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { getUserOperations } from "@/auth/authContext";

type MenuItem = Required<MenuProps>["items"][number];

const baseMenuItems: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <PieChartOutlined />,
    children: [
      {
        key: "/",
        label: <div className=" font-light">Overview</div>,
        icon: <BarChartOutlined />,
      },
      {
        key: "/products",
        label: <div className=" font-light">Products</div>,
        icon: <FolderOpenOutlined className=" font-light" />,
      },
    ],
  },
  {
    key: "business",
    label: "Business",
    icon: <DesktopOutlined />,
    children: [
      {
        key: "/branches",
        label: <div className=" font-light">Branches</div>,
        style: { paddingRight: 20, backgroundImage: "inherit" },
        icon: <BranchesOutlined className="w-4 text-slate-700" />,
      },
      {
        key: "/staff-members",
        label: <div className=" font-light">Staff Members</div>,
        icon: <UserOutlined />,
      },
    ],
  },
  // {
  //   key: "reports",
  //   label: "Reports",
  //   icon: <SnippetsOutlined />,
  //   children: [
  //     {
  //       key: "/branches",
  //       label: <div className=" font-light">Branches</div>,
  //       style: { paddingRight: 20, backgroundImage: "inherit" },
  //       icon: <BranchesOutlined className="w-4 text-slate-700" />,
  //     },
  //     {
  //       key: "/staff-members",
  //       label: <div className=" font-light">Staff Members</div>,
  //       icon: <UserOutlined />,
  //     },
  //   ],
  // },
];

const protectedMenuItems: Record<string, MenuItem> = {
  MassMarketLoans: {
    key: "MassMarketLoans",
    label: "Mass Markets",
    icon: <ContainerOutlined />,
    children: [
      {
        key: "/clients",
        label: <div className=" font-light">Clients</div>,
        icon: <UsergroupAddOutlined />,
      },
      {
        key: "/loans",
        label: <div className=" font-light">Loans</div>,
        icon: <FileProtectOutlined />,
      },
    ],
  },
  OrganisationLoans: {
    key: "organisationLoans",
    label: "Organisation Loans",
    icon: <AuditOutlined />,
    children: [
      {
        key: "/organisations",
        label: <div className=" font-light">Organisations</div>,
        icon: <HomeOutlined />,
      },
    ],
  },
  MouLoans: {
    key: "mouLoans",
    label: "MOU Loans",
    icon: <FileDoneOutlined />,
    children: [
      {
        key: "/mou-organisations",
        label: <div className=" font-light">Organisations</div>,
        icon: <HomeOutlined />,
      },
      {
        key: "/loans-mous",
        label: <div className=" font-light">MOUs</div>,
        icon: <ProjectOutlined />,
      },
      {
        key: "/transactions",
        label: <div className=" font-light">Transactions</div>,
        icon: <CreditCardOutlined />,
      },
      {
        key: "/receipting",
        label: <div className=" font-light">Receipting</div>,
        icon: <BookOutlined />,
      },
    ],
  },
  MoneyLenderLoans: {
    key: "MoneyLenderLoans",
    label: "Money Lenders",
    icon: <ReadOutlined />,
    children: [
      {
        key: "/money-lender-clients",
        label: <div className=" font-light">Clients</div>,
        icon: <UsergroupAddOutlined />,
      },
      {
        key: "/money-lender-loans",
        label: <div className=" font-light">Loans</div>,
        icon: <FileProtectOutlined />,
      },
    ],
  },
};

export const getMenuItems = (): MenuItem[] => {
  const userOperations = getUserOperations();
  const menuItems: MenuItem[] = [...baseMenuItems];
  userOperations.forEach((operation) => {
    if (protectedMenuItems[operation]) {
      menuItems.push(protectedMenuItems[operation]);
    }
  });

  return menuItems;
};

export const MenuItems = getMenuItems();
