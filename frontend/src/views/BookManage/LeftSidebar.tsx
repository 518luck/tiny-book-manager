import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const LeftSidebar = () => {
  return (
    <div className="flex h-full bg-[#030303]">
      <SidebarProvider className="h-full bg-gray-950">
        <SidebarTrigger>
          <Button>Open Sidebar</Button>
        </SidebarTrigger>
      </SidebarProvider>
    </div>
  );
};

export default LeftSidebar;
