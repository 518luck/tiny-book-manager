import { Search } from "lucide-react";

import { useGetBookListMutation } from "@/apis/hooks/books";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Book from "@/views/BookManage/components/Book";

const Books = () => {
  const { data } = useGetBookListMutation();
  return (
    <div className="h-full w-full">
      <section className="m-2 flex items-center justify-start gap-3">
        <InputGroup className="w-md">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="搜索书籍" />
        </InputGroup>
        <Button>添加书籍</Button>
      </section>
      <section className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </section>
    </div>
  );
};

export default Books;
