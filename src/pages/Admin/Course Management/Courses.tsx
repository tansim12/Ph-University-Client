import { Button, Modal, Table } from "antd";

import { useState } from "react";
import {
  useCreateFacultiesByCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/Features/Admin/couseManagement.api";
import PHForm from "../../../Components/From/PHForm";
import PHSelect from "../../../Components/From/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/Features/Admin/userManagement.api";
import { toast } from "sonner";
import { handleApiError } from "../../../utils/handleApiError";

const Courses = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  // const onChange: TableProps<TTableData>['onChange'] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === 'filter') {
  //     const queryParams: TQueryParam[] = [];
  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

const AddFacultyModal = ({ facultyInfo }: { facultyInfo: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addFacultiesByCourses] = useCreateFacultiesByCourseMutation();
  const facultiesOption = facultiesData?.map(({ _id, name }) => ({
    value: _id,
    label: name?.firstName,
  }));

  const handleSubmit = async (data: any) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };

    const toastId = toast.message("Semester Create Loading");

    try {
      const res = await addFacultiesByCourses(facultyData).unwrap();
      if (res?.success) {
        toast.success("Faculty Assign Successfully done", {
          id: toastId,
          duration: 3000,
        });
        handleCancel();
      }
    } catch (error) {
      handleApiError(error, toastId);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
