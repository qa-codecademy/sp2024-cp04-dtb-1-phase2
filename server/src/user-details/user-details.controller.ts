import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDetailsService } from './user-details.service';
import { CreateUserDetailsDto } from './dto/create-user-details.dto';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';

@Controller('user-details')
export class UserDetailsController {
  constructor(private readonly usersDetailsService: UserDetailsService) {}

  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() createUserDetailsDto: CreateUserDetailsDto,
  ) {
    return this.usersDetailsService.create(userId, createUserDetailsDto);
  }

  @Get()
  findAll() {
    return this.usersDetailsService.findAllUserDetails();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersDetailsService.findUserDetailsById(id);
  }

  @Patch(':id')
  updateUserDetails(
    @Param('id') id: string,
    @Body() updateUserDetailsDto: UpdateUserDetailsDto,
  ) {
    return this.usersDetailsService.updateUserDetails(id, updateUserDetailsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersDetailsService.deleteUserDetails(id);
  }
}
