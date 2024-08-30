import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

import { TQueryParamAcademicSemester } from "../../../Types/global.type";
import { useGetAllRegisteredSemesterQuery } from "../../../redux/Features/Admin/couseManagement.api";
import { TRegisteredSemester } from "../../../Types/couseManagement.type";
import moment from "moment";

export type TTableData = Pick<
  TRegisteredSemester,
  "_id" | "startDate" | "endDate"
>;

const RegisteredSemester: React.FC = () => {
  const [params, setParams] = useState<TQueryParamAcademicSemester[]>([]);
  const { data, isFetching } = useGetAllRegisteredSemesterQuery(params);
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Semester",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdate(record._id)}>
            Update
          </Button>
          <Button
            type="default"
            danger
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
      width: "1px",
    },
  ];

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

  const tableData = data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester?.name} ${academicSemester?.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  // Example handler functions for Update and Delete
  const handleUpdate = (id: string) => {
    console.log("Update clicked for id:", id);
    // Implement update logic here
  };

  const handleDelete = (id: string) => {
    console.log("Delete clicked for id:", id);
    // Implement delete logic here
  };


  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData as unknown as never}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegisteredSemester;
