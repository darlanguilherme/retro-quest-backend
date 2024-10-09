import { Body, Controller, Get, Post, Param, Delete, UseGuards,  ValidationPipe, UsePipes, UseFilters } from '@nestjs/common';
import { CardService } from './card.service';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { HttpExceptionFilter } from 'src/filters/http.exception.filter';


@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Post()
  // @UseFilters(new HttpExceptionFilter())
  async create(@Body() body) {
    return await this.cardService.create(body);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  // @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.cardService.findAll();
  }

  @Get('/:id/details')
  @UseFilters(new HttpExceptionFilter())
  // @UseGuards(JwtAuthGuard)
  async findCompleteById(@Param('id') id: string) {
    return this.cardService.findDetailsById(parseInt(id));
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: number) {
    return this.cardService.findById(id);
  }

  // @Delete(':id')
  // @UseFilters(new HttpExceptionFilter())
  // async delete(@Param('id') id: number) {
  //   return this.cardService.delete(id);
  // }
}
