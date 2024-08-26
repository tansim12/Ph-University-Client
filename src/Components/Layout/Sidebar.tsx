import { Layout, Menu } from "antd";
const { Sider } = Layout;
import generateRoutesNavLinks from "../../utils/generateRouteNavLinks";
import { adminPath } from "../../routes/route.admin";
import { facultyPath } from "../../routes/route.faculty";
import { studentPath } from "../../routes/route.student";
import useAuthUserInfo from "../../hooks/useAuthUserInfo";
const Sidebar = () => {
  const { user } = useAuthUserInfo();

  const userRole = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
  };
  const role = user?.role as string;

  let sidebarItems;

  switch (role) {
    case userRole?.ADMIN:
      sidebarItems = generateRoutesNavLinks(adminPath, "admin");
      break;
    case userRole?.FACULTY:
      sidebarItems = generateRoutesNavLinks(facultyPath, "faculty");
      break;
    case userRole?.STUDENT:
      sidebarItems = generateRoutesNavLinks(studentPath, "student");
      break;
    default:
      break;
  }

  return (
    <Sider
    style={{ height: '100vh', position: 'sticky', top: '0', left: '0' }}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="flex justify-center items-center  ">
        <div className="bg-white rounded-full size-20 flex justify-center items-center   font-extrabold  my-auto">
          PH-UNI
        </div>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
