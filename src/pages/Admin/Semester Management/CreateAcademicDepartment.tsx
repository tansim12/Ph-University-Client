import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../Components/From/PHInput";
import PHForm from "../../../Components/From/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../Schema/academicSemesterManage.schema";
import {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/Features/Admin/academicManagement.api";
import { handleApiError } from "../../../utils/handleApiError";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHSelect from "../../../Components/From/PHSelect";

const CreateAcademicDepartment = () => {
  const navigate = useNavigate();
  const { data } = useGetAllAcademicFacultyQuery(undefined);
  const allAcademicFaculty = data?.map((item) => ({
    value: item?._id,
    label: item?.name,
  }));
  const [createAcademicDepartment] = useCreateAcademicDepartmentMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.message("Creating");
    try {
      const res = await createAcademicDepartment(data).unwrap();
      if (res?.success) {
        toast.success("Create Successfully done", {
          id: toastId,
          duration: 3000,
        });
        navigate("/admin/academic-department");
      }
    } catch (error) {
      handleApiError(error, toastId);
    }
  };
  return (
    <div>
      <h1 className="font-bold text-lg text-center my-5">
        Create Academic Semester
      </h1>

      <div>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHInput name="name" type="text" label="Academic Faculty" />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={allAcademicFaculty!}
          />
          <button type="submit" className="border border-blue-500 px-3 py-2">
            Submit
          </button>
        </PHForm>
      </div>
    </div>
  );
};

export default CreateAcademicDepartment;
