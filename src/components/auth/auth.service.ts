import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    const userLogged = await this.validateUser(user.username, user.password);

    if (!userLogged) {
      return { logged: false };
    }
    return { logged: true, user: userLogged };
  }
}
