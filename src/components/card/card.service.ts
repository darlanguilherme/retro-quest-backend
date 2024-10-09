import { Injectable } from '@nestjs/common';
import { CardRepository } from './card.repository';  // Importe o CardRepository
import * as bcrypt from 'bcrypt';

@Injectable()
export class CardService {
  constructor(private cardRepository: CardRepository) { }

  async create(card) {
    try {
      return await this.cardRepository.create(card);
    } catch (error) {
      throw new Error('Erro ao criar o card: ' + error.message);
    }
  }

  async likeCard(cardId: number, userId: number) {
    try {

      const card = await this.cardRepository.findOneById(cardId);

      if (!card) {
        throw new Error('Card não encontrado');
      }

      const cardLike = card.likes.find((like) => like.userId === userId);

      if (cardLike) {
        await this.cardRepository.deleteCardLike(cardLike.id)
      } else {
        await this.cardRepository.createCardLike({ cardId, userId });
      }

      return this.findDetailsById(cardId);
    } catch (error) {
      throw new Error('Erro ao dar like no card: ' + error.message);
    }
  };

  async findOneById(id: number) {
    return this.cardRepository.findOneById(id);
  }

  async teste() {
    console.log('teste');
  }

  async findAll() {
    return this.cardRepository.findAll();
  }

  async findDetailsById(id: number) {
    return this.cardRepository.findDetailsById(id);
  }

  async findById(id: number) {
    return this.cardRepository.findById(id);
  }

  // async delete(id: number) {
  //   return this.cardRepository.delete(id);
  // }
}
