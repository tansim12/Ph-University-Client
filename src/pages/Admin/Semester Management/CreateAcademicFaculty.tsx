import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../Components/From/PHInput";
import PHForm from "../../../Components/From/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../Schema/academicSemesterManage.schema";

const CreateAcademicFaculty = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1 className="font-bold text-lg text-center my-5">
        Create Academic Semester
      </h1>

      <div>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHInput name="name" type="text" label="Academic Faculty" />
          <button type="submit" className="border border-blue-500 px-3 py-2">
            Submit
          </button>
        </PHForm>
      </div>
    </div>
  );
};

export default CreateAcademicFaculty;
