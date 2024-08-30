import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../Components/From/PHForm";
import PHSelect from "../../../Components/From/PHSelect";
import {
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
  useGetAssignFacultiesByCourseQuery,
} from "../../../redux/Features/Admin/couseManagement.api";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/Features/Admin/academicManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/Features/Admin/userManagement.api";
import PHInput from "../../../Components/From/PHInput";
import { Button } from "antd";
import PHTimePicker from "../../../Components/From/PHTimePicker";
import { useState } from "react";
import PHSelectWithWatch from "../../../Components/From/PHSelectWithWatch";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");
  const { data: courseData } = useGetAllCoursesQuery([
    { name: "sort", value: "-createdAt" },
  ]);

  const courseOptions = courseData?.map((item) => ({
    label: item?.title,
    value: item?._id,
  }));

  const { data: registeredSemester } = useGetAllRegisteredSemesterQuery([]);

  const registeredSemesterOptions = registeredSemester?.map((item) => ({
    label: `${item?.academicSemester?.name} ${item?.academicSemester?.year}`,
    value: item?._id,
  }));

  const { data: academicDepartment } = useGetAllAcademicDepartmentQuery([]);

  const academicDepartmentOptions = academicDepartment?.map((item) => ({
    label: item?.name,
    value: item?._id,
  }));

  const { data: academicFaculty } = useGetAllAcademicFacultyQuery([]);
  const academicFacultyOptions = academicFaculty?.map((item) => ({
    label: item?.name,
    value: item?._id,
  }));
  const { data: assignFaculties } =
    useGetAssignFacultiesByCourseQuery(courseId);
  console.log(assignFaculties);

  const assignFacultiesOptions = assignFaculties?.faculties?.map((item) => ({
    label: item?.name?.firstName,
    value: item?._id,
  }));

  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const daysOptions = days?.map((i) => ({
    label: i,
    value: i,
  }));

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="text-center text-lg my-3">Create Offer Course</div>

      <PHForm onSubmit={handleSubmit}>
        {/* semesterRegistration 1 */}
        <div>
          <PHSelect
            label="Semester Registration"
            name="semesterRegistration"
            options={registeredSemesterOptions}
          />
        </div>
        {/* Academic Faculty 2*/}
        <div>
          {/* এইখান এ উল্টাপাল্টা আছে  , faculty নামে academicFaculty এর ডাটা যাচ্ছে । কারন backend a ultapalta ache  */}
          <PHSelect
            label="Academic Faculty"
            name="faculty"
            options={academicFacultyOptions}
          />
        </div>
        {/* academic department 3*/}
        <div>
          <PHSelect
            label="Academic Department"
            name="academicDepartment"
            options={academicDepartmentOptions}
          />
        </div>
        {/* course 4*/}
        <div>
          <PHSelectWithWatch
            changeOnValue={setCourseId}
            label="Course"
            name="course"
            options={courseOptions}
          />
        </div>
        {/* Faculty 4*/}
        <div>
          {/* এইখান এ উল্টাপাল্টা আছে  , academicFaculty নামে faculty মানে স্যার user model  এর ডাটা যাচ্ছে । কারন backend a ultapalta ache  */}
          <PHSelect
            disabled={!courseId || !assignFacultiesOptions?.length}
            label="Faculty"
            name="academicFaculty"
            options={assignFacultiesOptions}
          />
        </div>
        <div>
          <PHInput name="maxCapacity" label="Max Capacity" type="Number" />
        </div>
        <div>
          <PHInput name="section" label="Section" type="Number" />
        </div>
        <div>
          <PHSelect
            mode="multiple"
            name="days"
            label="Days"
            options={daysOptions}
          />
        </div>
        <div>
          <PHTimePicker name="startTime" label="Start Time" />
        </div>
        <div>
          <PHTimePicker name="endTime" label="end Time" />
        </div>

        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </>
  );
};

export default OfferCourse;
