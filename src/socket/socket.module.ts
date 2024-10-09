import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { BoardModule } from 'src/components/board/board.module';
import { CardModule } from 'src/components/card/card.module';

@Module({
  imports: [BoardModule, CardModule],
  providers: [SocketGateway],
})
export class SocketModule { }
