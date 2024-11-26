import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('simple-array')
  roles: string[];
}
