import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRole } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async assignRole(userId: number, role: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    if (!Object.values(UserRole).includes(role as UserRole)) {
      throw new Error('Invalid role');
    }

    user.roles.push(role); // Add role to user
    return await this.userRepository.save(user);
  }

  async updateRole(userId: number, role: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    user.roles = [role]; // Set a single role (could be expanded for multiple roles)
    return await this.userRepository.save(user);
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    return await this.userRepository.remove(user); // Remove user from the database
  }
  async findByUsername(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  async create(data: any) {
    return this.userRepository.create(data);
  }
}
