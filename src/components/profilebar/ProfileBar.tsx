import { Link } from "react-router-dom";
import { useAuth } from "../../auth/authContext";
import {
  HomeOutlined,
  LogoutOutlined,
  RightOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
// import { Offline, Online } from "react-detect-offline";
import { jwtDecode } from "jwt-decode";

import { useLocation } from "react-router-dom";

export interface DecodedToken {
  FirstName?: string;
  LastName?: string;
  email?: string;
  PhoneNumber?: string;
  Id?: string;
}

export const decodeAccessToken = (): DecodedToken | null => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

const ProfileBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const user = decodeAccessToken();
  const location = useLocation();
  const currentPath = location.pathname;

  const pathHierarchy: Record<
    string,
    { title: string; module?: string; parent?: string; parentPath?: string }
  > = {
    "/": { title: "Overview", module: "Dashboard" },
    "/products": { title: "Products", module: "Dashboard" },
    "/branches": { title: "Branches", module: "Business" },
    "/staff-members": { title: "Staff Members", module: "Business" },
    "/clients": { title: "Clients", module: "Mass Markets" },
    "/loans": { title: "Loans", module: "Mass Markets" },
    "/organisations": { title: "Organisations", module: "Organisation Loans" },
    "/mou-organisations": { title: "Organisations", module: "MOU Loans" },
    "/loans-mous": { title: "MOUs", module: "MOU Loans" },
    "/transactions": { title: "Transactions", module: "MOU Loans" },
    "/receipting": { title: "Receipting", module: "MOU Loans" },
    "/money-lender-clients": { title: "Clients", module: "Money Lenders" },
    "/money-lender-loans": { title: "Loans", module: "Money Lenders" },
    "/settings": { title: "Settings" },
    "/microfin-org-details": {
      title: "Organisation Details",
      module: "Organisation Loans",
      parent: "Organisations",
      parentPath: "/organisations",
    },
    "/mou-organisation-details": {
      title: "Organisation Details",
      module: "MOU Loans",
      parent: "Organisations",
      parentPath: "/mou-organisations",
    },
  };

  const getPageInfo = () => {
    const hierarchyInfo = pathHierarchy[currentPath];

    if (hierarchyInfo) {
      return hierarchyInfo;
    }

    // For unknown paths
    const locationState = location.state;

    // Handle detail pages based on their parent paths
    if (currentPath.includes("-details") && locationState?.member) {
      const member = locationState.member;

      // Try to determine the parent path and module based on current path pattern
      if (currentPath.includes("mou-organisation")) {
        return {
          title: `${member.name || "Organisation"} Details`,
          module: "MOU Loans",
          parent: "Organisations",
          parentPath: "/mou-organisations",
        };
      } else if (currentPath.includes("microfin-org")) {
        return {
          title: `${member.name || "Organisation"} Details`,
          module: "Organisation Loans",
          parent: "Organisations",
          parentPath: "/organisations",
        };
      }
    }

    // Default fallback
    return {
      title: "Page",
      module: undefined,
      parent: undefined,
      parentPath: undefined,
    };
  };

  const currentPageInfo = getPageInfo();
  const pageTitle = currentPageInfo.title;
  const moduleTitle = currentPageInfo.module;
  const parentTitle = currentPageInfo.parent;
  const parentPath = currentPageInfo.parentPath;

  const fullName = `${user?.FirstName ?? ""} ${user?.LastName ?? ""}`;
  const email = user?.email ?? "";

  const initial = user?.FirstName?.charAt(0).toUpperCase() || "?";

  const backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;

  const content = (
    <div className="min-w-52 flex flex-col gap-2">
      <p
        className="flex items-center gap-2 hover:bg-gray-50 hover:font-normal hover:text-green-600"
        onClick={() => logout()}
      >
        <LogoutOutlined />
        Logout
      </p>
      <Link to="/settings">
        <p className="flex items-center gap-2 hover:bg-gray-50 hover:font-normal hover:text-green-600">
          <SettingOutlined />
          Settings
        </p>
      </Link>
    </div>
  );
  return (
    <div className="  w-full h-[3.7rem] flex justify-between pt-3 px-4">
      <div className="flex px-1">
        <div className="flex gap-1 items-center text-sm text-gray-600">
          <Link
            to="/"
            className="hover:text-green-600 text-center flex items-center"
          >
            <HomeOutlined className="mr-1" />
            <span>Home</span>
          </Link>
          {currentPath !== "/" && (
            <>
              {/* Module level */}
              {moduleTitle && (
                <>
                  <RightOutlined className="mx-1 text-xs" />
                  <span className="text-gray-500">{moduleTitle}</span>
                </>
              )}

              {/* Parent page level (for detail pages) */}
              {parentTitle && parentPath && (
                <>
                  <RightOutlined className="mx-1 text-xs" />
                  <Link
                    to={parentPath}
                    className="text-gray-500 hover:text-green-600 transition-colors"
                  >
                    {parentTitle}
                  </Link>
                </>
              )}

              <RightOutlined className="mx-1 text-xs" />
              <span className="font-medium text-gray-500">{pageTitle}</span>
            </>
          )}{" "}
        </div>
      </div>

      <div>
        {" "}
        {isAuthenticated && (
          <Popover content={content}>
            <section className="flex  justify-center items-center gap-2 ">
              <div className="relative">
                <div
                  className="w-10 h-10 cursor-pointer flex items-center justify-center bg-blue-50 rounded-full hover:bg-green-100 transition font-semibold text-sm text-gray-800"
                  title="Click to logout"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor }}
                  >
                    {initial}
                  </div>
                </div>
                {/* <Online>
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-500 animate-blink border border-white" />
                </Online>
                <Offline>
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-white" />
                </Offline> */}
              </div>

              <div className="w-full flex flex-col gap-1">
                <h1 className="text-xs font-semibold">{fullName}</h1>
                <h1 className="text-[10px] text-gray-500">{email}</h1>
              </div>
            </section>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default ProfileBar;
