import { DbService } from '@/db/db.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from '@/user/dto/register-user.dto';
import { User } from '@/user/entities/user.entity';
import { LoginUserDto } from '@/user/dto/login-user.dto';

@Injectable()
export class UserService {
  @Inject(DbService)
  private readonly dbService: DbService;

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = (await this.dbService.read()) as User[];

    const foundUser = users.find(
      (item) => item.username === registerUserDto.username,
    );

    if (foundUser) {
      throw new BadRequestException('用户名已存在');
    }

    const user = new User();
    // 这个地方用new User()创建一个新的实例
    // 类型检查保障： 在赋值时，TypeScript 严格检查你是否正确地给 User 类定义的属性赋值。
    // 方法和原型： 如果 User 类定义了任何方法（例如 user.validatePassword()），那么通过 new User() 创建的实例将拥有这些方法。
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;
    users.push(user);

    await this.dbService.write(users);
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = (await this.dbService.read()) as User[];

    if (!users) {
      throw new BadRequestException('用户不存在');
    }

    const foundUser = users.find(
      (item) => item.username === loginUserDto.username,
    );

    if (!foundUser) {
      throw new BadRequestException('用户不存在');
    }

    if (foundUser.password !== loginUserDto.password) {
      throw new BadRequestException('密码错误');
    }
    return foundUser;
  }
}
