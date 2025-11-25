import * as multer from 'multer';
import * as fs from 'fs';

//multer.diskStorage 创建一个 DiskStorage 引擎，告诉 multer “把文件存到磁盘，并由我们指定保存目录和文件名的逻辑”。
const storage = multer.diskStorage({
  //diskStorage 接受一个对象，这个对象必须实现两个回调：destination（目标目录）和 filename（生成保存用的文件名）。
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync('uploads');
    } catch (error) {
      console.error(error);
    }
    //意思是“没有错误（null），目标路径是 'uploads'”。
    cb(null, 'uploads');
  },
  //上传的文件在磁盘上取一个文件名（避免文件名冲突、保留扩展名等）。
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    //cb(null, ...) 的含义 —— 回调签名
    //第一个参数 null 表示没有错误。
    //第二个参数 uniqueSuffix 是生成的文件名。
    cb(null, uniqueSuffix);
  },
});

export { storage };
