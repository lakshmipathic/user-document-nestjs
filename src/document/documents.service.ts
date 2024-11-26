import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import * as path from 'path';

@Injectable()
export class DocumentsService {
  private readonly uploadDir = path.join(__dirname, '..', '..', 'uploads');
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  async create(data: Partial<Document>) {
    return this.documentsRepository.save(data);
  }
  async upload(
    file: Express.Multer.File,
    description?: string,
  ): Promise<Document> {
    console.log('file');
    const document = this.documentsRepository.create({
      title: file.originalname,
      filePath: file.path,
      description,
    });
    return await this.documentsRepository.save(document);
  }

  async findAll() {
    return this.documentsRepository.find();
  }

  async findOne(id: number) {
    const document = await this.documentsRepository.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async update(id: number, data: Partial<Document>) {
    await this.findOne(id); // Ensure document exists
    return this.documentsRepository.update(id, data);
  }

  async delete(id: number) {
    const document = await this.findOne(id);
    return this.documentsRepository.remove(document);
  }
}
