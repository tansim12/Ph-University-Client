import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import OfferedCourses from "../pages/Faculty/OfferedCourses";
import { IAccRoutes } from "../Types/routesTypes";
import generateRoutes from "../utils/generateRoutes";



export const facultyPath:IAccRoutes[] = [
    {
      name: "Dashboard",
      path: "dashboard",
      element: <FacultyDashboard />,
    },
    {
      name: "Offered Course",
      path: "offered-course",
      element: <OfferedCourses />,
    },
   
  ];

export const facultyRoutes = generateRoutes(facultyPath)