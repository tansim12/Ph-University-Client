import { useGetAllAcademicFacultyQuery } from "../../../redux/Features/Admin/academicManagement.api";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TQueryParamAcademicSemester } from "../../../Types/global.type";

export type TTableData = {
  name: string;
  createdAt: string;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
  },

  {
    title: "createdAt",
    dataIndex: "createdAt",
  },
];

const AcademicFaculty: React.FC = () => {
  const [params, setParams] = useState<TQueryParamAcademicSemester[]>([]);
  const { data, isFetching } = useGetAllAcademicFacultyQuery(params);
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

  const tableData = data?.map(({ _id, name, createdAt }) => ({
    key: _id,
    name,
    createdAt,
  }));

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData as TTableData[]}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicFaculty;
