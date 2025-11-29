const { VITE_API_BASE_URL } = import.meta.env;
const Book = () => {
  return (
    <div className="flex h-35 w-26 flex-col items-center justify-center border border-[#333333]">
      <section>
        <img
          src={`${VITE_API_BASE_URL}/uploads/1764037520489-370086747-%E5%A4%B4%E5%83%8F.png`}
          alt="book"
          className="h-full w-full object-contain"
        />
      </section>
      <section>书名</section>
      <section>操作</section>
    </div>
  );
};

export default Book;
