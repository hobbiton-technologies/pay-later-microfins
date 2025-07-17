import { Menu } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItems } from "./SideBarOptions/SideBarOptions";
// import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
// import { Offline, Online } from "react-detect-offline";
// import { useAuth } from "../../auth/authContext";
// import logo from "../../../public/images/lipilaLater.png";

export const Sidebar = () => {
  const [collapsed] = useState(false);
  // const { isAuthenticated, logout } = useAuth();

  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };

  const nav = useNavigate();
  return (
    <motion.div
      animate={{
        width: collapsed ? "7.0rem" : "16.4rem",
        height: collapsed ? "calc(100% - 3rem)" : "100%",
      }}
      transition={{ duration: 0.05 }}
      className="hidden md:flex flex-col min-h-screen !bg-white border-r border-slate-300 shadow-sm  "
    >
      <div className=" text-center pr-2 ">
        <div className="p-1 flex items-center  border-b border-slate-300  gap-2 justify-start mb-2 ml-4 mt-4">
          <img
            src="../../../public/images/lipilaLater.png"
            alt="logo"
            style={{ width: "50%" }}
          />
        </div>
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto pt-4 bg-white   ">
        <Menu
          className="custom-menu"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={MenuItems}
          onClick={({ key }) => {
            nav(key);
          }}
        />
      </div>
    </motion.div>
  );
};
