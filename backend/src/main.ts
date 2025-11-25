import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  //来自 @nestjs/platform-express，用于注册静态资源目录。
  // “Nest，以后 /uploads 这个路径访问到的，就是我本地文件夹里的文件。”
  //  __dirname : Node.js 的内置变量 : 表示当前文件所在的目录的绝对路径
  // 不是运行目录（process.cwd()），而是 当前 JS 文件的目录
  //   path.join() : Node.js 的 path 模块提供的方法
  // 用来拼接路径，自动处理 / 或 \，保证跨平台安全
  app.useStaticAssets(join(__dirname, '../uploads'), {
    //这是访问 URL 的前缀。
    prefix: '/uploads',
  });

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
