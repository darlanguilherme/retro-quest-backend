import { Module } from '@nestjs/common';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';
import { PrismaService } from './prisma.service';
import { SocketModule } from './socket/socket.module';
import { BoardModule } from './components/board/board.module';
import { CardModule } from './components/card/card.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BoardModule,
    CardModule,
    SocketModule
  ],
  providers: [PrismaService],
})
export class AppModule { }
