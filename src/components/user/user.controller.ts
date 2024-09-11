import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: { username: string; password: string }) {
    return this.userService.create(body.username, body.password);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
