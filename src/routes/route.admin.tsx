import { ReactNode } from "react";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/CreateAdmin";
import CreateFaculty from "../pages/Admin/CreateFaculty";
import CreateStudent from "../pages/Admin/CreateStudent";
import { NavLink } from "react-router-dom";
interface IAccRoutes {
  path: string;
  element: ReactNode;
}
interface IAccRoutesItem {
  key: string;
  label: ReactNode | string;
  children?: IAccRoutesItem[];
}

const adminPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
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
      {
        name: "Create student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];

// logical way creating  { key: "admin Dashboard",label: <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>,
//   }, such as masterLayout.tsx
export const adminRoutesItem = adminPath.reduce(
  (acc: IAccRoutesItem[], item) => {
    if (item?.name && item?.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/admin/${item?.path}`}>{item?.name}</NavLink>,
      });
    }
    if (item?.children) {
      acc.push({
        key: item?.name,
        label: item?.name,
        children: item?.children?.map((child) => {
          return {
            key: child?.name,
            label: (
              <NavLink to={`/admin/${child?.path}`}>{child?.name}</NavLink>
            ),
          };
        }),
      });
    }

    return acc;
  },
  []
);

// logical way creating  [{path:"----", element:<--- />}] such as routes.tsx
export const adminRoutes = adminPath.reduce((acc: IAccRoutes[], item) => {
  if (item?.path && item?.element) {
    acc.push({
      path: item?.path,
      element: item?.element,
    });
  }

  if (item?.children) {
    item?.children.forEach((child) =>
      acc.push({
        path: child?.path,
        element: child?.element,
      })
    );
  }
  return acc;
}, []);

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
