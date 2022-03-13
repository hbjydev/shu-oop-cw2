import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from 'src/response.dto';
import { QueryFailedError } from 'typeorm';
import { VoterTokenRequest } from './dtos/VoterTokenRequest';
import { VoterService } from './voter.service';

@Controller('voter')
export class VoterController {
  public constructor(private voterService: VoterService) {}

  @Post('/token')
  public async getToken(
    @Body(new ValidationPipe({ whitelist: true }))
    voterTokenRequest: VoterTokenRequest,
    @Res()
    response: Response,
  ) {
    try {
      const { token } = await this.voterService.create(
        voterTokenRequest.voterId,
      );
      response.status(201).json(
        new ApiResponse('Successfully generated a Voter token.', {
          eat: token.eat,
          token: token.token,
        }),
      );
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (
          error.message.startsWith(
            'duplicate key value violates unique constraint',
          )
        ) {
          response
            .status(400)
            .json(
              new ApiResponse(
                'Failed to generate a Voter token',
                'A Voter with that voterId already exists.',
                false,
              ),
            );
        }
      }
    }
  }
}
