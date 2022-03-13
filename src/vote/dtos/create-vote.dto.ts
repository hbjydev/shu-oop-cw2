import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
