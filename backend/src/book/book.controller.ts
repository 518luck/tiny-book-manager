import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { BookService } from '@/book/book.service';
import { CreateBookDto } from '@/book/dto/create-book.dto';
import { UpdateBookDto } from '@/book/dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { storage } from '@/book/my-file-storage';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  async list() {
    return this.bookService.list();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put('update')
  async update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }

  @Post('upload')
  @UseInterceptors(
    //第一个参数 file 说明 这是multipart表单字段名称<input type='file' name='file'/>
    FileInterceptor('file', {
      //默认的DisKStorage dest指定文件会保存到的目录(相对于运行目录)
      dest: 'uploads',
      //如果同时设置storage,dest会被忽略mdest知识简写的配置
      //storage 期望是一个Multer Storage引擎
      // storage 并不是一个字符串、路径、配置对象，而是 一个“对象/实例”，负责“怎么保存文件”。
      // 这个“对象/实例”就叫 Storage Engine（存储引擎）。
      storage: storage,
      //limits 配置文件上传大小限制
      limits: {
        fileSize: 1024 * 1024 * 3,
      },
      // 一个函数，用来决定是否接受当前文件。调用 callback(null, true) 接受，callback(null, false) 拒绝但不报错，callback(new Error(...), false) 则表示拒绝并报错。
      fileFilter(req, file, callback) {
        // path.extname(file.originalname) 检查扩展名（基于文件名后缀）
        const extname = path.extname(file.originalname);
        if (['.png', '.jpg', '.gif'].includes(extname)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('只能上传图片'), false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file.path;
  }
}
