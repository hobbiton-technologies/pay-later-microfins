import { TabsProps, Tabs } from "antd";
import AnimatedHeader from "../components/AnimatedHeader";
import { TransactionLoansTable } from "./components/transaction/TransactionLoansTable";
import { TransactionRepaymentsTable } from "./components/transaction/TransactionRepaymentsTable";

const Transactions = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Transactions",
      children: <TransactionLoansTable />,
    },
    {
      key: "2",
      label: "Loans",
      children: <TransactionRepaymentsTable />,
    },
    {
      key: "3",
      label: "Repayments",
      children: <TransactionRepaymentsTable />,
    },
  ];

  const onChange = (key: string) => {
    // console.log(key);
  };

  return (
    <div>
      <div className=" px-4">
        <AnimatedHeader title="Transactions" />
        <p className=" text-slate-500 text-xs">Access your transactions here</p>
      </div>
      <section className="w-full h-full  justify-evenly items-center pt-8">
        <Tabs
          type="card"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </section>
    </div>
  );
};

export default Transactions;
