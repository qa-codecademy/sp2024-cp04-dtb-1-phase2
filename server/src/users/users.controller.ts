import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Post('/change-password/:id')
  changeUserPassword(
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updatePasswordOnUser(id, updateUserPasswordDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/posts/:id')
  findPostsByUser(@Param('id') id: string) {
    return this.usersService.findPostsByUser(id);
  }

  @UseGuards(AuthGuard)
  @Get('comments')
  findCommentsByUser(@Req() req: { user: User }) {
    console.log(req.user);

    return this.usersService.findCommentsByUser(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('user-details')
  findUserDetailsByUser(@Req() req: { user: User }) {
    console.log(req.user);

    return this.usersService.findUserDetailsByUser(req.user.id);
  }

  @Get('/subscription/:userSubscribe/:id')
  updateSubscribeOnUser(
    @Param('id') id: string,
    @Param('userSubscribe') userSubscribe: 'subscribe' | 'unsubscribe',
  ) {
    return this.usersService.updateSubscribeOnUser(id, userSubscribe);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
