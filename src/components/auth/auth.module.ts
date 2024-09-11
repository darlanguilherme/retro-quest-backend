import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../strategy/jwt.strategy';
import { UserModule } from '../user/user.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SK3$%dKvdDK',
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
