import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';  // Importe o UserRepository
import * as bcrypt from 'bcrypt';
import { formatLvl } from 'src/utils/Utils';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }

  async create(body) {
    try {
      const passwordHash = await bcrypt.hash(body.password, 10);
      return await this.userRepository.create({
        username: body.username,
        nickname: body.username,
        passwordHash,
        role: body.role || 'USER',
      });
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
  }

  async update(user, body) {
    try {
      const data = {
        nickname: body.nickname,
        username: body.username,
        avatarId: body.avatarId || null,
      };

      if (body.password) {
        data['passwordHash'] = await bcrypt.hash(body.password, 10);

      }

      return await this.userRepository.update(user.id, data);
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
  }

  async findOneById(id: number) {
    return this.userRepository.findOneById(id);
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOneByUsername(username);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async delete(id: number) {
    return this.userRepository.delete(id);
  }

  async findAvatars(user) {
    return this.userRepository.findAvatars(user.id);
  }

  async findAvatarsShop(user) {
    return this.userRepository.findAvatarsShop(user.id);
  }

  async findRanking() {
    return this.userRepository.findRanking();
  }

  async findRewards(user) {
    return this.userRepository.findRewards(user.id);
  }

  async purchaseAvatars(userToken, body) {
    const user = await this.userRepository.findOneById(userToken.id);
    const avatarsToPurchase = await this.userRepository.getAvatarsById(body.avatarIds);

    const totalValue = avatarsToPurchase.reduce((sum, avatar) => sum + avatar.itemValue, 0);

    if (user.coins < totalValue) {
      throw new Error('Saldo insuficiente.');
    }

    await this.userRepository.purchaseAvatars(user.id, body.avatarIds);

    let newCoinsUser = user.coins - totalValue;
    return this.userRepository.updateUserCoins(user.id, newCoinsUser);
  }

  async rendeenReward(userToken, body) {
    const user = await this.userRepository.findOneById(userToken.id);

    if (user.userReward.some(reward => reward.id === body.rewardId)) {
      throw new Error('Usuário já resgatou essa recompensa.');
    }

    const reward = await this.userRepository.getRewardById(body.rewardId, user.id);

    if (formatLvl(user.experience) < reward.lvlRequired) {
      throw new Error('Usuário não possui nível suficiente.');
    }

    const rewardRendeed = await this.userRepository.rendeenReward(user.id, reward.id);

    if (!rewardRendeed) {
      throw new Error('Erro ao resgatar recompensa.');
    }

    return await this.userRepository.getRewardById(body.rewardId, user.id);
  }
}
