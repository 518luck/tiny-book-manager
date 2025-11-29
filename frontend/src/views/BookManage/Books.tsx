import Book from "@/views/BookManage/components/Book";

const Books = () => {
  return (
    <div className="h-full w-full">
      <section className="bg-amber-100">搜索框</section>
      <section className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(10)].map((_, index) => (
          <Book key={index} />
        ))}
      </section>
    </div>
  );
};

export default Books;
