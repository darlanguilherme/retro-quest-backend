import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CardService } from './card.service';
import { CardRepository } from './card.repository';
import { CardController } from './card.controller';

@Module({
  controllers: [CardController],
  providers: [CardService, CardRepository, PrismaService],
  exports: [CardService],
})
export class CardModule { }
