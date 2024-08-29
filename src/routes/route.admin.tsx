import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/User Management/CreateAdmin";
import CreateFaculty from "../pages/Admin/User Management/CreateFaculty";
import CreateStudent from "../pages/Admin/User Management/CreateStudent";
import generateRoutes from "../utils/generateRoutes";
import { IAccRoutes } from "../Types/routesTypes";
import AcademicSemester from "../pages/Admin/Semester Management/AcademicSemester";
import CreateAcademicSemester from "../pages/Admin/Semester Management/CreateAcademicSemester";
import CreateAcademicFaculty from "../pages/Admin/Semester Management/CreateAcademicFaculty";
import AcademicFaculty from "../pages/Admin/Semester Management/AcademicFaculty";
import CreateAcademicDepartment from "../pages/Admin/Semester Management/CreateAcademicDepartment";
import AcademicDepartment from "../pages/Admin/Semester Management/AcademicDepartment";
import AllStudents from "../pages/Admin/User Management/AllStudents";
import UpdateStudent from "../pages/Admin/User Management/UpdateStudent";
import SemesterRegistration from "../pages/Admin/Course Management/SemesterRegistration";
import RegisteredSemester from "../pages/Admin/Course Management/RegisteredSemester";
import CreateCourse from "../pages/Admin/Course Management/CreateCourse";
import Courses from "../pages/Admin/Course Management/Courses";
import OfferCourse from "../pages/Admin/Course Management/OfferCourse";
import OfferedCoursesAdmin from "../pages/Admin/Course Management/OfferedCoursesAdmin";

export const adminPath: IAccRoutes[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "C. A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "C. A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "C. A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
    path: "",
    element: undefined,
  },

  // user management
  {
    name: "User Management",
    children: [
      {
        name: "Create student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "V. Student",
        path: "all-students",
        element: <AllStudents />,
      },
      {
        path: "student-update/:id",
        element: <UpdateStudent />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
    ],
    path: "",
    element: undefined,
  },
  // course management
  {
    name: "Course Management",
    children: [
      {
        name: "S. Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered S.",
        path: "registered-semester",
        element: <RegisteredSemester />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "all-courses",
        element: <Courses />,
      },
      {
        name: "Offer Course",
        path: "offer-course",
        element: <OfferCourse />,
      },
      {
        name: "Offered Courses",
        path: "offered-courses",
        element: <OfferedCoursesAdmin />,
      },
    ],
    path: "",
    element: undefined,
  },
];

// logical way creating  [{path:"----", element:<--- />}] such as routes.tsx
export const adminRoutes = generateRoutes(adminPath);
// hard coded way
// export const adminRoutes = [
//   {
//     path: "dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "create-admin",
//     element: <CreateAdmin />,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFaculty />,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent />,
//   },
// ];
