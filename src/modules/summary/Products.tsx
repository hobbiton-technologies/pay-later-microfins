import { Tabs, TabsProps } from "antd";
import AnimatedHeader from "../components/AnimatedHeader";
import ProductStats from "./components/ProductStats";
import { CreditCardOutlined } from "@ant-design/icons";
import { ProductsTable } from "./components/ProductsTable";

export const Products = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Loan Products",
      icon: <CreditCardOutlined />,
    },
  ];
  return (
    <div className=" ">
      <div>
        <AnimatedHeader title="Products" />
        <p className="text-slate-500 text-xs">
          Customizable financial products
        </p>
      </div>
      <div>
        <ProductStats />
        <div>
          <section className="w-full h-full hidden md:flex md:flex-col pt-4">
            <Tabs type="card" defaultActiveKey="1" items={items} />
          </section>
        </div>
        <div>
          <ProductsTable />
        </div>
      </div>
    </div>
  );
};
