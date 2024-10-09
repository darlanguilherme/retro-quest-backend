import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';
import { BoardController } from './board.controller';

@Module({
  controllers: [BoardController],
  providers: [BoardService, BoardRepository, PrismaService],
  exports: [BoardService],
})
export class BoardModule { }
