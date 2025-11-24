import { Inject, Injectable } from '@nestjs/common';
import { type DbModuleOptions } from '@/db/db.module';
import { access, readFile, writeFile } from 'fs/promises';
import { User } from '@/user/entities/user.entity';

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

    // JSON.parse可能会解析出来乱七八糟,我也不知道怎么解决,所以我这里用as断言一下
    return JSON.parse(str) as User[];
  }

  async write(obj: Record<string, any>) {
    await writeFile(this.options.path, JSON.stringify(obj || []), {
      encoding: 'utf-8',
    });
  }
}
