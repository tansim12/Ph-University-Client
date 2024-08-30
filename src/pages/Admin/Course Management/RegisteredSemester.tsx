import React, { useState } from "react";
import { Button, Dropdown, Space, Table } from "antd";
import type { MenuProps, TableColumnsType, TableProps } from "antd";

import { TQueryParamAcademicSemester } from "../../../Types/global.type";
import {
  useGetAllRegisteredSemesterQuery,
  useStatusUpdateSemesterRegistrationMutation,
} from "../../../redux/Features/Admin/couseManagement.api";
import { TRegisteredSemester } from "../../../Types/couseManagement.type";
import moment from "moment";
import { semesterRegistrationStatus } from "../../../Const/courseManagement.const";
import { toast } from "sonner";
import { handleApiError } from "../../../utils/handleApiError";

export type TTableData = Pick<
  TRegisteredSemester,
  "_id" | "startDate" | "endDate"
>;

const items: MenuProps["items"] = semesterRegistrationStatus.map((i) => ({
  label: i?.value,
  key: i?.value,
}));

const RegisteredSemester: React.FC = () => {
  const [params, setParams] = useState<TQueryParamAcademicSemester[]>([]);
  const { data, isFetching } = useGetAllRegisteredSemesterQuery(params);
  const [updateStatus, { isLoading }] =
    useStatusUpdateSemesterRegistrationMutation();
  const [itemId, setItemId] = useState("");

  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    if (itemId) {
      const payload = {
        _id: itemId,
        body: { status: e.key },
      };
      const toastId = toast.message("Updating");

      try {
        const res = await updateStatus(payload).unwrap();
        if (res?.success) {
          toast.success("  Registered Semester Updating done", {
            id: toastId,
            duration: 3000,
          });
        }
      } catch (error) {
        handleApiError(error, toastId);
      }
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
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
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setItemId(record?._id)}>
              <Space>Update</Space>
            </Button>
          </Dropdown>
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
      _id,
      name: `${academicSemester?.name} ${academicSemester?.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  const handleDelete = (id: string) => {
    console.log("Delete clicked for id:", id);
    // Implement delete logic here
  };

  return (
    <Table
      loading={isFetching || isLoading}
      columns={columns}
      dataSource={tableData as unknown as never}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegisteredSemester;
