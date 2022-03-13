import { IsNotEmpty } from 'class-validator';

export class VoterTokenRequest {
  @IsNotEmpty()
  public voterId: string;
}
