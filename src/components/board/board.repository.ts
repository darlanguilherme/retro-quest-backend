import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Board } from '@prisma/client';

@Injectable()
export class BoardRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: Board): Promise<Board> {
        return await this.prisma.board.create({
            data,
        });
    }

    async update(id: number, data: any) {
        return await this.prisma.board.update({
            where: { id },
            data,
        });
    }

    async findOneById(id: number) {
        return this.prisma.board.findUnique({
            where: { id },
        });
    }

    async findAll(): Promise<Board[]> {
        return this.prisma.board.findMany();
    }

    async findById(id: number): Promise<Board> {
        return this.prisma.board.findUnique({
            where: { id },
        });
    }

    async findDetailsById(id: number): Promise<any> {
        return this.prisma.board.findUnique({
            where: { id },
            include: {
                cards: {
                    include: {
                        likes: true,
                        creator: true
                    },
                }
            },
        });
    }

    async delete(id: number) {
        return this.prisma.board.delete({
            where: { id },
        });
    }
}
