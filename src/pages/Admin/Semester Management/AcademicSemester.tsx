import { useGetAllAcademicSemesterQuery } from "../../../redux/Features/Admin/academicManagement.api";
import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TAcademicSemester } from "../../../Types/academicSemesterManage.type";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<TAcademicSemester> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],

  },
 
  {
    title: "Year",
    dataIndex: "year",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
    
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
    
  },
];



const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const AcademicSemester: React.FC = () => {
  const { data } = useGetAllAcademicSemesterQuery(undefined);
  console.log(data);
  
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
