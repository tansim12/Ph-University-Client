import React, { useState } from "react";
import { Button, Pagination, Space, Table } from "antd";
import type { PaginationProps, TableColumnsType, TableProps } from "antd";
import { TQueryParamAcademicSemester } from "../../../Types/global.type";
import { useGetAllStudentsQuery } from "../../../redux/Features/Admin/userManagement.api";
import { TStudent } from "../../../Types";
import { useNavigate } from "react-router-dom";

// export type TTableData = {
//   _id:string,
//   name:string,
//   id:string
// };
export type TTableData = Pick<TStudent, "name" | "id" | "_id">;

const AllStudents: React.FC = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState<TQueryParamAcademicSemester[]>([]);
  const { data: studentData, isFetching: studentIsFetching } =
    useGetAllStudentsQuery([{ name: "sort", value: "id" },{ name: "limit", value: 3 }, ...params]);
  console.log(studentData?.meta);

  const tableData = studentData?.result?.map(({ _id, name, id }) => ({
    key: _id,
    _id,
    id,
    name: name?.firstName,
  }));

  const metaData = studentData?.meta;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },

    {
      title: "Student Id ",
      dataIndex: "id",
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
          <Button type="default" danger onClick={() => handleBlock(record._id)}>
            Block
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
      setParams(queryParams);
    }
  };

  // Example handler functions for Update and Delete
  const handleUpdate = (id: string) => {
    navigate(`/admin/student-update/${id}`)
    console.log("Update clicked for id:", id);
    // Implement update logic here
  };

  const handleDelete = (id: string) => {
    console.log("Delete clicked for id:", id);
    // Implement delete logic here
  };
  const handleBlock = (id: string) => {
    console.log("Delete clicked for id:", id);
    // Implement delete logic here
  };

  const handlePagination: PaginationProps["onChange"] = (
    pageNumber,
    pageSize
  ) => {
    console.log(pageNumber, pageSize);
    setParams([{ name: "page", value: pageNumber }, ...params]);
  };
  return (
    <>
      <Table
        pagination={false}
        loading={studentIsFetching}
        columns={columns}
        dataSource={tableData as unknown as TTableData[]}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      {/* _pagination  */}
      <div>
        <Pagination
          showQuickJumper
          defaultCurrent={1}
          pageSize={metaData?.limit}
          total={metaData?.total}
          onChange={handlePagination}
        />
      </div>
    </>
  );
};

export default AllStudents;
