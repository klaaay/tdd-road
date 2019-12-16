import React from "react";
import { Table, Button } from "antd";
import useAntdTable, { FnParams } from "../index";

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: "male" | "female";
}

interface Result {
  total: number;
  data: Item[];
}

const getTableData = ({ current, pageSize }: FnParams<Item>) =>
  fetch(`https://randomuser.me/api?results=55&page=${current}&size=${pageSize}`)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      data: res.results
    }));

const App: React.FC = () => {
  const { tableProps, refresh, reload } = useAntdTable<Result, Item>(
    getTableData
  );
  const columns = [
    {
      title: "name",
      dataIndex: "name.last"
    },
    {
      title: "email",
      dataIndex: "email"
    },
    {
      title: "phone",
      dataIndex: "phone"
    },
    {
      title: "gender",
      dataIndex: "gender"
    }
  ];

  return (
    <React.Fragment>
      <Table columns={columns} rowKey="email" {...tableProps} />
      <Button onClick={refresh}>Refresh</Button>
      <Button onClick={reload}>Reload</Button>
    </React.Fragment>
  );
};

export default App;
