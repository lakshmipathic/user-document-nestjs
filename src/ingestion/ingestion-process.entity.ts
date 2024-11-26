import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ingestion_processes')
export class IngestionProcess {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentId: number;

  @Column({ default: 'PENDING' }) // Status: PENDING, IN_PROGRESS, COMPLETED, FAILED
  status: string;

  @Column({ nullable: true })
  errorMessage: string;

  @CreateDateColumn()
  startedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
