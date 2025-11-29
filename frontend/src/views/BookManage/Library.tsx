import { CircleUser } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Books from "@/views/BookManage/Books";
import LeftSidebar from "@/views/BookManage/LeftSidebar";
const Library = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#575758] text-stone-300">
      <main className="flex h-140 w-[80%] bg-[#212121]">
        {/* 左侧导航栏 */}
        <div className="h-full w-[16%]">
          <LeftSidebar />
        </div>

        {/* 右侧内容区域 */}
        <main className="h-full w-full">
          <div className="flex h-11 cursor-pointer justify-end border-l border-[#333333] bg-gray-950 p-2">
            <CircleUser onClick={() => navigate("/")} />
          </div>
          <section className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#212121] h-[calc(100%-46px)] overflow-auto">
            <Books />
          </section>
        </main>
      </main>
    </div>
  );
};

export default Library;
