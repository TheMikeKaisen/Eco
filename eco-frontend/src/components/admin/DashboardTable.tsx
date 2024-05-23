import { Column } from "react-table";
import TableHOC from "./TableHOC";
import { useMemo } from "react";

interface DataType {
  _id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

const columns: Column<DataType>[] = [
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const DashboardTable = ({ data = [] }: { data: DataType[] }) => {
  const MemoizedTable = useMemo(
    () =>
      TableHOC<DataType>(columns, data, "transaction-box", "Top Transaction"),
    [data]
  );

  return <MemoizedTable />;
};

export default DashboardTable;
