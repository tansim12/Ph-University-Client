import { Navigate } from "react-router-dom";
import { useGetAllAcademicSemesterQuery } from "../../../redux/Features/Admin/academicManagement.api";

const AcademicSemester = () => {
  const { data, isError } = useGetAllAcademicSemesterQuery(undefined);

  console.log(data);

  if (isError) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return <div>Academic Semester</div>;
};

export default AcademicSemester;
