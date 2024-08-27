import { useGetAllAcademicDepartmentQuery } from "../../../redux/Features/Admin/academicManagement.api";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TQueryParamAcademicSemester } from "../../../Types/global.type";

export type TTableData = {
  name: string;
  createdAt: string;
  academicFaculty: {
    name: string;
  };
};

const columns: TableColumnsType<TTableData> = [
  {
    title: "Department",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
  },

  {
    title: "Academic Faculty",
    dataIndex: "academicFaculty",
  },
  {
    title: "createdAt",
    dataIndex: "createdAt",
  },
];

const AcademicDepartment: React.FC = () => {
  const [params, setParams] = useState<TQueryParamAcademicSemester[]>([]);
  const { data, isFetching } = useGetAllAcademicDepartmentQuery(params);
  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParamAcademicSemester[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  const tableData = data?.map(({ _id, name, createdAt, academicFaculty }) => ({
    key: _id,
    name,
    createdAt,
    academicFaculty: academicFaculty?.name,
  }));

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData as unknown as TTableData[]}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicDepartment;
