import Sidebar from "./common/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar />
			<Outlet />
		</div>
	);
};

export default DashboardLayout;
