import { Body, Controller, Get, Post, Param, Delete, UseGuards, ValidationPipe, UsePipes, UseFilters } from '@nestjs/common';
import { BoardService } from './board.service';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { HttpExceptionFilter } from 'src/filters/http.exception.filter';
import { User } from 'src/decorator/user.decorator';


@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) { }

  @Post()
  // @UseFilters(new HttpExceptionFilter())
  async create(@Body() body) {
    return await this.boardService.create(body);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  // @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.boardService.findAll();
  }

  @Get('/:id/details')
  @UseFilters(new HttpExceptionFilter())
  // @UseGuards(JwtAuthGuard)
  async findCompleteById(@Param('id') id: string) {
    return this.boardService.findDetailsById(parseInt(id));
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: number) {
    return this.boardService.findById(id);
  }

  @Delete(':id')
  @UseFilters(new HttpExceptionFilter())
  async delete(@Param('id') id: number) {
    return this.boardService.delete(id);
  }

  @Post('/finish')
  // @UseFilters(new HttpExceptionFilter())
  async finish(@Body() body) {
    return await this.boardService.finish(body.retroId);
  }

  @Post('/voteMvp')
  @UseFilters(new HttpExceptionFilter())
  async setMvp(@User() user: any, @Body() body) {
    return await this.boardService.voteMvp({ ...body, userVoted: user.id });
  }

}
