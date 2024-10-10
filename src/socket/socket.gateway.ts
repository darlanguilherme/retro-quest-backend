import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BoardService } from 'src/components/board/board.service';
import { CardService } from 'src/components/card/card.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Ajuste conforme necessário
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private boardService: BoardService,
    private cardService: CardService
  ) { }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  @SubscribeMessage('joinBoard')
  handleJoinBoard(client: Socket, boardId: string) {
    client.join(boardId);
    console.log(`Client ${client.id} joined board: ${boardId}`);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('addCard')
  async handleAddCard(client: Socket, newCard: any) {
    const card = await this.cardService.create(newCard);
    this.server.to(`board_${card.boardId}`).emit('cardAdded', card);
    console.log('Card emitted to board:', card);
  }

  @SubscribeMessage('finishBoard')
  async handleFinishBoard(client: Socket, boardId: any) {
    const finished = await this.boardService.finish(boardId);
    this.server.to(`board_${boardId}`).emit('boardFinished', finished);
    console.log('Card emitted to board:', finished);
  }

  @SubscribeMessage('likeCard')
  async handleLikeCard(client: Socket, data: { cardId: number; userId: number }) {
    const card = await this.cardService.likeCard(data.cardId, data.userId);
    this.server.to(`board_${card.boardId}`).emit('cardLiked', card);
  }
}
