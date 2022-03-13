import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';
import { VoteOption } from '../vote.entity';

export class UpdateVoteDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsArray()
  options?: VoteOption[];
}
