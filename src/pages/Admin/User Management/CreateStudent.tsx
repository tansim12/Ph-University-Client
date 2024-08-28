import { Button, Divider } from "antd";
import PHForm from "../../../Components/From/PHForm";
import PHInput from "../../../Components/From/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../Components/From/PHSelect";
import { bloodOptions, genderOptions } from "../../../Types/global.type";
import PHDatePicker from "../../../Components/From/PHDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicSemesterQuery,
} from "../../../redux/Features/Admin/academicManagement.api";
import { useCreateStudentMutation } from "../../../redux/Features/Admin/userManagement.api";
import { handleApiError } from "../../../utils/handleApiError";
import { toast } from "sonner";
import PHFileUpload from "../../../Components/From/PHFileUpload";

const defaultData = {
  name: {
    firstName: "Emma",
    middleName: "D.",
    lastName: "Williams",
  },
  age: 21,
  // email: "student445545545545454@example444.com",
  gender: "female",
  //   profileImg: "http://example.com/images/emma_williams.jpg",
  blood: "AB+",
  //   dateOfBirth: "2003-11-05",

  address: {
    currentAddress: "321 Cedar St, Apt 8E",
    permanentAddress: "654 Spruce St, House 9",
    zip: 87654,
    district: "East District",
  },
  contactNo: "555-1122",

  guardian: {
    fatherName: "David Williams",
    motherName: "Linda Williams",
    fatherMobNo: "456-789-0123",
    motherMobNo: "765-432-1098",
    fatherOccupation: "Accountant",
    motherOccupation: "Scientist",
  },

  academicDepartment: "667906d93b5106593755ea9f",
  admissionSemester: "666152858575fc5a25f16b12",
  //   isDelete: false,
};

const CreateStudent = () => {
  const [createStudent,] = useCreateStudentMutation();

  // get A. semester data
  const { data: semesterData, isLoading: sIsLoading } =
    useGetAllAcademicSemesterQuery(undefined);
  const semesterDataOptions = semesterData?.map((item) => ({
    label: `${item?.name} ${item?.year}`,
    value: item?._id,
  }));

  //   get A. department data
  const { data: departmentData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined, { skip: sIsLoading });
  const departmentDataOptions = departmentData?.map((item) => ({
    label: `${item?.name} `,
    value: item?._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const payload = {
      password: "password1234",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    formData.append("file", data?.file)

    const toastId = toast.message("Creating");
    try {
      const res = await createStudent(formData).unwrap();
      if (res?.success) {
        toast.success("Student Create Successfully done", {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (error) {
      handleApiError(error, toastId);
    }


    // ! this check just local
    // console.log(Object.fromEntries(formData));
  };


  return (
    <div>
      <p className="text-lg text-center my-4"> Create Student </p>
      <div>
        <PHForm onSubmit={onSubmit} defaultValues={defaultData}>
          {/* personal info div  */}
          <Divider style={{ borderColor: "#7cb305" }}>
            personal Info
          </Divider>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div>
              <PHInput name="name.firstName" label="First Name" type="text" />
            </div>
            <div>
              <PHInput name="name.middleName" label="Middle Name" type="text" />
            </div>
            <div>
              <PHInput name="name.lastName" label="Las Name" type="text" />
            </div>
            <div>
              <PHInput name="age" label="Age" type="number" />
            </div>
            <div>
              <PHInput name="email" label="Email" type="email" />
            </div>
            <div>
              <PHSelect name="gender" label="Gender" options={genderOptions} />
            </div>
            <div>
              <PHSelect name="blood" label="Blood" options={bloodOptions} />
            </div>
            <div>
              <PHDatePicker name="dateOfBirth" label="Date Of Birth"/>
            </div>
            <div>
              <PHFileUpload name="file" label="Picture"  type="file"  />
            </div>
          </div>
          {/* Address info div  */}
          <Divider style={{ borderColor: "#7cb305" }}>
            Address Info
          </Divider>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div>
              <PHInput
                name="address.currentAddress"
                label="Current Address"
                type="text"
              />
            </div>
            <div>
              <PHInput
                name="address.permanentAddress"
                label="Permanent Address"
                type="text"
              />
            </div>
            <div>
              <PHInput
                name="address.currentAddress"
                label="Current Address"
                type="text"
              />
            </div>
            <div>
              <PHInput name="address.zip" label="Zip" type="number" />
            </div>
            <div>
              <PHInput name="address.district" label="District" type="text" />
            </div>
            <div>
              <PHInput name="contactNo" label="ContactNo" type="text" />
            </div>
          </div>
          {/* guardian info div  */}
          <Divider style={{ borderColor: "#7cb305" }}>
            Guardian Info
          </Divider>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div>
              <PHInput
                name="guardian.fatherName"
                label="Father Name"
                type="text"
              />
            </div>
            <div>
              <PHInput
                name="guardian.motherName"
                label="Mother Name"
                type="text"
              />
            </div>
            <div>
              <PHInput
                name="guardian.fatherMobNo"
                label="Father MobNo"
                type="text"
              />
            </div>
            <div>
              <PHInput
                name="guardian.motherMobNo"
                label="Mother MobNo"
                type="text"
              />
            </div>
            <div>
              <PHInput
                name="guardian.fatherOccupation"
                label="Father Occupation"
                type="text"
              />
            </div>
            <div>
              <PHInput
                name="guardian.motherOccupation"
                label="Mother Occupation"
                type="text"
              />
            </div>
          </div>
          {/* Semester info div  */}
          <Divider style={{ borderColor: "#7cb305" }}>
            Semester Info
          </Divider>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div>
              <PHSelect
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
                options={semesterDataOptions!}
              />
            </div>
            <div>
              <PHSelect
                disabled={dIsLoading}
                name="academicDepartment"
                label="Admission Semester"
                options={departmentDataOptions!}
              />
            </div>
          </div>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </div>
    </div>
  );
};

export default CreateStudent;
