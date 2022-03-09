import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @CreateDateColumn()
  public cat: Date;

  @UpdateDateColumn()
  public uat: Date;
}

export default Vote;

