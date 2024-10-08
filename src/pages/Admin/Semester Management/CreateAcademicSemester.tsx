import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../Components/From/PHForm";
import PHSelect from "../../../Components/From/PHSelect";
import { academicSemesterNameAndCode } from "../../../Const/academicManage.const";
import { monthOptions } from "../../../Const/global.const";
import { academicSemesterSchema } from "../../../Schema/academicSemesterManage.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreateAcademicSemesterMutation } from "../../../redux/Features/Admin/academicManagement.api";
import { handleApiError } from "../../../utils/handleApiError";

const CreateAcademicSemester = () => {
  const [createAcademicSemester] = useCreateAcademicSemesterMutation();
  const currentYear = new Date().getFullYear();

  const yearOptions = [0, 1, 2, 3, 4].map((i) => ({
    value: (currentYear + i).toString(),
    label: (currentYear + i).toString(),
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const name = academicSemesterNameAndCode[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };

    const toastId = toast.message("Semester Create Loading");
    console.log(typeof toastId);

    try {
      const res = await createAcademicSemester(semesterData).unwrap();
      if (res?.success) {
        toast.success("Academic Semester Create Successfully done", {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (error) {
      handleApiError(error,toastId);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-lg text-center my-5">
        Create Academic Semester
      </h1>

      <div className="grid grid-cols-12 justify-center items-center  rounded-lg ">
        <div className=" col-span-6 w-full">
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicSemesterSchema)}
          >
            <PHSelect
              label="Name"
              name="name"
              options={academicSemesterNameAndCode}
            />
            <PHSelect label="Year" name="year" options={yearOptions} />
            {/* start month  */}
            <PHSelect
              label="Start Month"
              name="startMonth"
              options={monthOptions}
            />
            {/* start month  */}
            <PHSelect
              label="End Month"
              name="endMonth"
              options={monthOptions}
            />

            <button type="submit" className="border border-blue-500 px-3 py-2">
              Submit
            </button>
          </PHForm>
        </div>
      </div>
    </div>
  );
};

export default CreateAcademicSemester;
