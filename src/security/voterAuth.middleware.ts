import { Injectable, NestMiddleware } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Request, Response } from 'express';
import { ApiResponse } from 'src/response.dto';
import { SecurityService } from './security.service';
import * as httpContext from 'express-http-context';

@Injectable()
export class VoterAuthMiddleware implements NestMiddleware {
  public constructor(private securityService: SecurityService) {}

  async use(req: Request, res: Response, next: (error?: any) => void) {
    if (!req.headers.authorization)
      return res
        .status(401)
        .json(
          new ApiResponse(
            `You must be authenticated to ${req.method} ${req.path}`,
            null,
            false,
          ),
        );

    const [type, tokenVal] = req.headers.authorization.split(' ');

    if (type.toLowerCase() !== 'bearer')
      return res
        .status(401)
        .json(new ApiResponse('Invalid token type', null, false));

    if (!isUUID(tokenVal))
      return res
        .status(401)
        .json(
          new ApiResponse(
            `You must be authenticated to ${req.method} ${req.path}`,
            null,
            false,
          ),
        );

    const vt = await this.securityService.getVoterToken(tokenVal);
    if (!vt)
      return res
        .status(401)
        .json(
          new ApiResponse(
            `You must be authenticated to ${req.method} ${req.path}`,
            null,
            false,
          ),
        );

    httpContext.set('voter', vt.voter);

    return next();
  }
}
