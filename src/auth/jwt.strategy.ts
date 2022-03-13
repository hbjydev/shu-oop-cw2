import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { VoterService } from 'src/voter/voter.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    private userService: UserService,
    private voterService: VoterService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  public async validate(payload: any) {
    if (payload.voter) {
      return { type: 'voter', rec: await this.voterService.find(payload.sub) };
    } else {
      return { type: 'user', rec: await this.userService.find(payload.sub) };
    }
  }
}
