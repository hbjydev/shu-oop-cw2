import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import Voter from 'src/voter/voter.entity';

@Injectable()
export class AuthService {
  public constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Returns a user based on a username and password combination
   * @param username The username to try and authenticate with
   * @param pass The password to authenticate with
   * @returns A user object, or nothing if the credentials are invalid.
   */
  public async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userService.getOneByUsername(username);

    if (user && (await compare(pass, user.password))) {
      return user;
    }

    return null;
  }

  public async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async voterLogin(voter: Voter) {
    return this.jwtService.sign({ voter: true, sub: voter.id });
  }
}
