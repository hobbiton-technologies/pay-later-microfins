import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const LoanPerformaceChart = () => {
  return (
    <div className=" shadow-sm rounded-md p-4">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Loan Perfomance by month</CardTitle>
          {/* <CardDescription>January - December 2025</CardDescription> */}
        </CardHeader>
      </Card>
    </div>
  );
};
