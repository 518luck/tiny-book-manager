import { Inject, Injectable } from '@nestjs/common';
import { type DbModuleOptions } from '@/db/db.module';
import { access, readFile } from 'fs/promises';

@Injectable()
export class DbService {
  @Inject('OPTIONS')
  private options: DbModuleOptions;

  async read() {
    const filePath = this.options.path;

    try {
      // 检查文件是否存在
      await access(filePath);
    } catch {
      return [];
    }

    // readFile :读取文件内容
    // { encoding: 'utf-8' } → 指定 字符编码
    const str = await readFile(filePath, { encoding: 'utf-8' });

    if (!str) {
      return [];
    }

    return JSON.parse(str);
  }
}
