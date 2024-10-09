import { Body, Controller, Get, Post, Param, Delete, UseGuards, ValidationPipe, UsePipes, UseFilters, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { HttpExceptionFilter } from 'src/filters/http.exception.filter';
import { User } from 'src/decorator/user.decorator';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() body) {
    return await this.userService.create(body);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  async update(@User() user: any, @Body() body) {
    return await this.userService.update(user, body);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  @UseFilters(new HttpExceptionFilter())
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Get('avatars')
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async getAvatars(@User() user: any) {
    return this.userService.findAvatars(user);
  }

  @Get('avatarsShop')
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async getAvatarsShop(@User() user: any) {
    return this.userService.findAvatarsShop(user);
  }

  @Post('purchaseAvatar')
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async purchaseAvatar(@User() user: any, @Body() body) {
    return await this.userService.purchaseAvatars(user, body);
  }

  @Post('rendeenReward')
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async rendeenReward(@User() user: any, @Body() body) {
    return await this.userService.rendeenReward(user, body);
  }

  @Get('ranking')
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async getRanking() {
    return this.userService.findRanking();
  }

  @Get('rewards')
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async getRewards(@User() user: any) {
    return this.userService.findRewards(user);
  }

}
