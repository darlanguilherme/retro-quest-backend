import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);

    if (user && await bcrypt.compare(pass, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const userLogged = await this.validateUser(user.username, user.password);

    if (!userLogged) {
      return { logged: false };
    }

    userLogged.maxExperience = 100;

    const token = this.jwtService.sign(userLogged);

    return { logged: true, user: userLogged, access_token: token };
  }
}
