import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface VoteOption {
  name: string;
  description?: string;
}

@Entity()
class Vote {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public startDate: Date;

  @Column()
  public endDate: Date;

  @Column('jsonb', { default: [] })
  public options: VoteOption[];

  @CreateDateColumn()
  public cat: Date;

  @UpdateDateColumn()
  public uat: Date;
}

export default Vote;
