import React from "react";
import { Table } from "antd";
import useAntdTable, { FnParams } from "../";

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

const getTableData = ({
  current,
  pageSize,
  sorter,
  filters,
}: FnParams<Item>) => {
  console.log(current, pageSize, sorter, filters);
  let url = `https://randomuser.me/api?results=55&page=${current}&size=${pageSize}`;
  if (sorter && sorter.field && sorter.order) {
    url += `&${sorter.field}=${sorter.order}`;
  }
  if (filters) {
    Object.entries(filters).forEach(i => {
      url += `&${i[0]}=${i[1]}`;
    });
  }
  return fetch(url)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      data: res.results,
    }));
};

export default () => {
  const { tableProps, filters, sorter } = useAntdTable<Result, Item>(
    getTableData,
    {
      defaultPageSize: 5,
    },
  );

  const columns = [
    {
      title: "name",
      dataIndex: "name.last",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      sorter: true,
      sortOrder: sorter.field === "phone" && sorter.order,
    },
    {
      title: "gender",
      dataIndex: "gender",
      filters: [
        { text: "男", value: "male" },
        { text: "女", value: "female" },
      ],
      filteredValue: filters.gender,
    },
  ];

  return <Table columns={columns} rowKey="email" {...tableProps} />;
};
