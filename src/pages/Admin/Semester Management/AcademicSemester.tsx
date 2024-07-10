import React from "react";
import { useGetAllAcademicSemesterQuery } from "../../../redux/Features/AcademicSemester/academicSemesterApi";
import { Navigate } from "react-router-dom";

const AcademicSemester = () => {
  const { data, isError } = useGetAllAcademicSemesterQuery(undefined);

  console.log(data);

  if (isError) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return <div></div>;
};

export default AcademicSemester;
