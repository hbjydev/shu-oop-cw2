import Vote from '../vote/vote.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ballot {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Vote)
  public vote: Vote;

  @Column()
  public option: string;
}
