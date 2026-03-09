import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      <main className="flex-1 p-4 pt-16 sm:p-6 lg:p-8 overflow-auto lg:ml-0 ml-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
