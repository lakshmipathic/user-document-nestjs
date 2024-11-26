import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IngestionProcess } from './ingestion-process.entity';

@Injectable()
export class IngestionManagementService {
  constructor(
    @InjectRepository(IngestionProcess)
    private readonly ingestionRepo: Repository<IngestionProcess>,
  ) {}

  async createIngestion(documentId: number): Promise<IngestionProcess> {
    const ingestion = this.ingestionRepo.create({ documentId });
    return await this.ingestionRepo.save(ingestion);
  }

  async updateStatus(
    id: number,
    status: string,
    errorMessage?: string,
  ): Promise<IngestionProcess> {
    const ingestion = await this.ingestionRepo.findOne({ where: { id } });
    if (!ingestion) throw new Error('Ingestion not found');
    ingestion.status = status;
    ingestion.errorMessage = errorMessage || null;
    return await this.ingestionRepo.save(ingestion);
  }

  async findAll(): Promise<IngestionProcess[]> {
    return await this.ingestionRepo.find();
  }

  async findOne(id: number): Promise<IngestionProcess> {
    return await this.ingestionRepo.findOne({ where: { id } });
  }
}
