import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, nullable: false })
  public username: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ enum: ['ADMIN', 'AUDIT'], default: 'ADMIN' })
  public role: string;

  @CreateDateColumn()
  public cat: Date;

  @UpdateDateColumn()
  public uat: Date;
}
