import { DashboardHeader } from '../DashboardHeader';
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardHeaderExample() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <div className="flex flex-col flex-1">
          <DashboardHeader />
        </div>
      </div>
    </SidebarProvider>
  );
}