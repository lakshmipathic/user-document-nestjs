import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  filePath: string;

  @Column({ default: new Date() })
  createdAt: Date;
}
