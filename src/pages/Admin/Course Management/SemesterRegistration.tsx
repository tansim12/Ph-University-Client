import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../Components/From/PHForm";
import PHSelect from "../../../Components/From/PHSelect";
import { useGetAllAcademicSemesterQuery } from "../../../redux/Features/Admin/academicManagement.api";
import { semesterRegistrationStatus } from "../../../Types/couseManagement.type";
import PHDatePicker from "../../../Components/From/PHDatePicker";
import PHInput from "../../../Components/From/PHInput";
import { Button } from "antd";
import { useCreateSemesterRegistrationMutation } from "../../../redux/Features/Admin/couseManagement.api";
import { toast } from "sonner";
import { handleApiError } from "../../../utils/handleApiError";

const SemesterRegistration = () => {
  const [createSemesterRegistration] = useCreateSemesterRegistrationMutation();

  // get A. semester data
  const { data: semesterData, isLoading: semesterIsLoading } =
    useGetAllAcademicSemesterQuery([{ name: "sort", value: "year" }]);
  const semesterDataOptions = semesterData?.map((item) => ({
    label: `${item?.name} ${item?.year}`,
    value: item?._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("click");

    console.log(data);
    const payload = {
        academicSemester: data?.academicSemester,
      status: data?.status,
      startDate: data?.startDate,
      endDate: data?.endDate,
      minCredit: Number(data?.minCredit),
      maxCredit: Number(data?.maxCredit),
    };
console.log(payload);

    const toastId = toast.message("Semester Create Loading")

    try {
      const res = await createSemesterRegistration(payload).unwrap();
      if (res?.success) {
        toast.success(" Semester Registration Successfully done", {
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
      <h1 className="font-bold text-lg text-center my-5">
        Create Academic Semester
      </h1>

      <div className="grid grid-cols-12 justify-center items-center  rounded-lg ">
        <div className=" col-span-6 w-full">
          <PHForm onSubmit={onSubmit}>
            <div>
              <PHSelect
                disabled={semesterIsLoading}
                label="Academic Semester"
                name="academicSemester"
                options={semesterDataOptions!}
              />
            </div>
            <PHSelect
              label="Status"
              name="status"
              options={semesterRegistrationStatus}
            />
            {/* start date  */}
            <div>
              <PHDatePicker name="startDate" label="Start Date" />
            </div>
            {/* end date  */}
            <div>
              <PHDatePicker name="endDate" label="End Date" />
            </div>
            <div>
              <PHInput name="minCredit" label="Min Credit" type="text" />
            </div>
            <div>
              <PHInput name="maxCredit" label="Max Credit" type="text" />
            </div>
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </div>
      </div>
    </div>
  );
};

export default SemesterRegistration;
