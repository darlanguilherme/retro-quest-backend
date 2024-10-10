import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class BoardService {
  constructor(
    private boardRepository: BoardRepository,
    private userService: UserService
  ) { }

  async create(board) {
    try {
      return await this.boardRepository.create(board);
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
  }

  async findOneById(id: number) {
    return this.boardRepository.findOneById(id);
  }

  async teste() {
    console.log('teste');
  }

  async findAll() {
    return this.boardRepository.findAll();
  }

  async findDetailsById(id: number) {
    return this.boardRepository.findDetailsById(id);
  }

  async findById(id: number) {
    return this.boardRepository.findById(id);
  }

  async delete(id: number) {
    return this.boardRepository.delete(id);
  }

  async finish(boardId: number) {
    const board = await this.boardRepository.findDetailsById(boardId);

    if (!board.isActive) {
      throw new Error('Não é possivel finalizar esse board.');
    }

    const scores: any = {};

    board?.cards.forEach((card) => {
      const creatorId = card.creatorId;

      if (!scores[creatorId]) {
        scores[creatorId] = {
          creator: card.creator,
          experience: 250,
          coins: 0
        };
      } else {
        scores[creatorId].experience += 250;
      }

      card.likes.forEach((like) => {
        if (like.userId !== creatorId) {
          scores[creatorId].coins += 100;
        }
      });
    });

    Object.values(scores).forEach(async (score: any) => {
      const additionalExprerience = score.experience > 1500 ? 1500 : score.experience;
      const additionalCoins = score.coins > 500 ? 500 : score.coins;

      const dataToUpdate = {
        experience: score.creator.experience + additionalExprerience,
        coins: score.creator.coins + additionalCoins
      }
      await this.userService.updateBoardRewards(score.creator.id, dataToUpdate);
    })

    await this.boardRepository.update(boardId, { isActive: false });

    return true;
  }
}
