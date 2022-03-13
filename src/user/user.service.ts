import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  public async getOneByUsername(username: string): Promise<User> {
    return this.repository.findOne({ username });
  }

  public async find(id: number): Promise<User> {
    return this.repository.findOne(id);
  }
}
