import Voter from 'src/voter/voter.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class VoterToken {
  @PrimaryColumn()
  public token: string;

  @ManyToOne(() => Voter, { nullable: false })
  public voter: Voter;

  @CreateDateColumn()
  public cat: Date;

  @Column({ nullable: false })
  public eat: Date;
}
