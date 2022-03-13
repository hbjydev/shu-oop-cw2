import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import Voter from 'src/voter/voter.entity';
import { AuthService } from './auth.service';
import { IsVoterGuard } from './is-voter.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  public constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  public me(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = req.user;
    return user;
  }

  @UseGuards(JwtAuthGuard, IsVoterGuard)
  @Get('me/voter')
  public meVoter(@Request() req) {
    const { rec }: { rec: Voter } = req.user;
    return rec;
  }
}
