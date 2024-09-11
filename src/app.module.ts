import { Module } from '@nestjs/common';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule, UserModule],
  providers: [PrismaService],
})
export class AppModule {}
