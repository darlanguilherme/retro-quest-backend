import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Card } from '@prisma/client';

@Injectable()
export class CardRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: Card): Promise<Card> {
        try {
            return await this.prisma.card.create({
                data,
            });

        } catch (error) {
            console.log(error)
        }
    }

    async findOneById(id: number) {
        return this.prisma.card.findUnique({
            where: { id },
            include: { likes: true }
        });
    }

    async findAll(): Promise<Card[]> {
        return this.prisma.card.findMany();
    }

    async findById(id: number): Promise<Card> {
        return this.prisma.card.findUnique({
            where: { id },
        });
    }

    async findDetailsById(id: number): Promise<Card> {
        return this.prisma.card.findUnique({
            where: { id },
            include: { likes: true },
        });
    }

    async deleteCardLike(id: number) {
        return this.prisma.cardLike.delete({
            where: { id },
        });
    }

    async createCardLike(data) {
        return this.prisma.cardLike.create({
            data,
        });
    }
}
