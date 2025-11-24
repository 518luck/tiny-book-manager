import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from '@/book/dto/create-book.dto';
import { UpdateBookDto } from '@/book/dto/update-book.dto';
import { DbService } from '@/db/db.service';
import { Book } from '@/book/entities/book.entity';

@Injectable()
export class BookService {
  @Inject('DbService')
  private readonly dbService: DbService;

  private async getBooksData(): Promise<Book[]> {
    const books: Book[] = (await this.dbService.read()) as Book[];
    return books;
  }

  async list() {
    const books: Book[] = await this.getBooksData();
    return books;
  }

  async findById(id: number) {
    const books: Book[] = await this.getBooksData();
    const book = books.find((item) => item.id === id);
    if (!book) {
      throw new BadRequestException('没有找到这本书');
    }
    return book;
  }

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.getBooksData();

    const book = new Book();
    book.id = books.length + 1;
    book.author = createBookDto.author;
    book.name = createBookDto.name;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;

    books.push(book);

    await this.dbService.write(books);
    return book;
  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.getBooksData();

    const foundBook = books.find((item) => item.id === updateBookDto.id);

    if (!foundBook) {
      throw new BadRequestException('没有找到这本书');
    }

    foundBook.name = updateBookDto.name;
    foundBook.author = updateBookDto.author;
    foundBook.description = updateBookDto.description;
    foundBook.cover = updateBookDto.cover;

    await this.dbService.write(books);
    return foundBook;
  }

  async delete(id: number) {
    const books: Book[] = await this.getBooksData();

    const foundBook = books.find((item) => item.id === id);
    if (!foundBook) {
      throw new BadRequestException('没有找到这本书');
    }

    const index = books.indexOf(foundBook);
    if (index === -1) {
      throw new BadRequestException('没有找到这本书');
    }
    books.splice(index, 1);
    await this.dbService.write(books);
  }
}
