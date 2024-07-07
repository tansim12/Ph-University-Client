import OfferedCourses from "../pages/Student/OfferedCourses";
import StudentDashboard from "../pages/Student/StudentDashboard";
import { IAccRoutes } from "../Types/routesTypes";
import generateRoutes from "../utils/generateRoutes";



export const studentPath:IAccRoutes[] = [
    {
      name: "Dashboard",
      path: "dashboard",
      element: <StudentDashboard />,
    },
    {
      name: "Offered Course",
      path: "offered-course",
      element: <OfferedCourses />,
    },
   
  ];

export const studentRoutes = generateRoutes(studentPath)