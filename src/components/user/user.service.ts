import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { username, password: hashedPassword },
    });
  }

  async findOne(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
