import LeftSidebar from "@/views/BookManage/LeftSidebar";

const BookList = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#575758] text-stone-300">
      <main className="flex h-[76%] w-[80%] bg-gray-800">
        {/* 左侧导航栏 */}
        <div className="h-full w-[16%]">
          <LeftSidebar />
        </div>

        {/* 右侧内容区域 */}
        <main>图书</main>
      </main>
    </div>
  );
};

export default BookList;
