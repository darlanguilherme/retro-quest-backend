import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: any) {
        return await this.prisma.user.create({
            data,
        });
    }

    async update(id, data: any) {
        return await this.prisma.user.update({
            where: { id },
            data,
            include: { avatar: true }
        });
    }

    async findOneById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            include: { userReward: true }
        });
    }

    async findOneByUsername(username: string) {
        return this.prisma.user.findUnique({
            where: { username },
            include: { avatar: true }
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

    async findAvatars(id: number) {
        return this.prisma.userAvatar.findMany({
            where: {
                userId: id,
                // avatar: { itemValue: 0 }
            },
            include: {
                avatar: true
            },
        });
    }

    async findAvatarsShop(userId: number) {
        return this.prisma.avatars.findMany({
            where: {
                NOT: { itemValue: 0 },
            },
            include: {
                users: {
                    where: { userId }
                }
            }
        });
    }

    async findRanking() {
        return this.prisma.user.findMany({
            include: { avatar: true },
        });
    }

    async findRewards(userId: number) {
        return this.prisma.rewards.findMany({
            include: {
                avatar: true,
                userReward: {
                    where: { userId }
                }
            },
        });
    }

    async getRewardById(id: number, userId: number) {
        return this.prisma.rewards.findFirst({
            where: { id },
            include: {
                avatar: true,
                userReward: {
                    where: { userId }
                }
            },
        });
    }

    async getAvatarsById(ids) {
        return this.prisma.avatars.findMany({
            where: { id: { in: ids } }
        });
    }

    async purchaseAvatars(userId, avatarIds) {
        return this.prisma.userAvatar.createMany({
            data: avatarIds.map(avatarId => ({ userId, avatarId }))
        });
    }

    async updateUserCoins(userId, coins) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { coins }
        });
    }

    async rendeenReward(userId, rewardId) {
        return this.prisma.userReward.create({
            data: { userId, rewardId }
        });
    }

}
