import { CircleUser } from "lucide-react";
import { useNavigate } from "react-router-dom";

import LeftSidebar from "@/views/BookManage/LeftSidebar";
const BookList = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#575758] text-stone-300">
      <main className="flex h-[76%] w-[80%] bg-[#212121]">
        {/* 左侧导航栏 */}
        <div className="h-full w-[16%]">
          <LeftSidebar />
        </div>

        {/* 右侧内容区域 */}
        <main className="w-full">
          <div className="flex h-11 cursor-pointer justify-end border-l border-[#333333] bg-gray-950 p-2">
            <CircleUser onClick={() => navigate("/")} />
          </div>
          <section></section>
        </main>
      </main>
    </div>
  );
};

export default BookList;
