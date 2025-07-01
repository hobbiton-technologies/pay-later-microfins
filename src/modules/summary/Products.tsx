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
    <div>
      <div>
        <AnimatedHeader title="Products" />
        <p>Customizable financial products</p>
      </div>
      <div>
        <ProductStats />
        <div>
          <section className="w-full h-full hidden md:flex md:flex-col pt-4">
            <Tabs defaultActiveKey="1" items={items} />
          </section>
        </div>
        <div>
          <p className=" !font-normal wrap-normal">Loan Products</p>
          <ProductsTable />
        </div>
      </div>
    </div>
  );
};
