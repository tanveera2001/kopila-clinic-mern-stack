import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
    return (
        <div className="flex">
            <AdminSidebar />

            <main className="flex-1 ml-64 p-6 overflow-y-auto max-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
