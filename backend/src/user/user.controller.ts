import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { RegisterUserDto } from '@/user/dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    return 'done';
  }
}
