import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../Components/From/PHForm";
import PHSelect from "../../../Components/From/PHSelect";

import { Button } from "antd";
import PHInput from "../../../Components/From/PHInput";
import {
  useCreateCoursesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/Features/Admin/couseManagement.api";
import { toast } from "sonner";
import { handleApiError } from "../../../utils/handleApiError";


const CreateCourse = () => {
  const [createCourses] = useCreateCoursesMutation();
  const { data: courseData } = useGetAllCoursesQuery([
    { name: "sort", value: "-createdAt" },
  ]);

  const courseOptions = courseData?.map((item) => ({
    label: item?.title,
    value: item?._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const createPreRequisiteCourses = data?.preRequisiteCourses?.map(
      (item: any) => ({
        course: item,
        isDelete: false,
      })
    );

    const payload = {
      ...data,
      code: Number(data?.code),
      credits: Number(data?.credits),
      preRequisiteCourses: createPreRequisiteCourses,
      isDelete: false,
    };

    const toastId = toast.message("Semester Create Loading");
    try {
      const res = await createCourses(payload).unwrap();
      if (res?.success) {
        toast.success("Academic Semester Create Successfully done", {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (error) {
      handleApiError(error, toastId);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-lg text-center my-5">Create Course</h1>

      <div className="grid grid-cols-12 justify-center items-center  rounded-lg ">
        <div className=" col-span-6 w-full">
          <PHForm onSubmit={onSubmit}>
            <PHInput name="title" label="Title" type="text" />
            <PHInput name="prefix" label="Prefix" type="text" />
            <PHInput name="code" label="Code" type="number" />
            <PHInput name="credits" label="Credits" type="number" />
            <PHSelect
              mode="multiple"
              label="PreRequisite Courses"
              name="preRequisiteCourses"
              options={courseOptions}
            />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
