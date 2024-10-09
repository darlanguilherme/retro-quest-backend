import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';  // Importe o BoardRepository
import * as bcrypt from 'bcrypt';

@Injectable()
export class BoardService {
  constructor(private boardRepository: BoardRepository) { }

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
}
