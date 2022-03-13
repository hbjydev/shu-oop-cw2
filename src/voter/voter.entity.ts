import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class Voter {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, nullable: false })
  public voterId: string;

  @CreateDateColumn()
  public cat: Date;

  @UpdateDateColumn()
  public uat: Date;
}

export default Voter;
