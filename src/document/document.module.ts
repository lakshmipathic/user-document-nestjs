import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Document } from './document.entity';
import { DocumentIngestionController } from './document-ingestion.controller';
import { DocumentIngestionService } from './document-ingestion.service';
import { HttpModule } from '@nestjs/axios';
import { DocumentQAController } from './document-qa.controller';
import { DocumentQAService } from './document-qa.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), HttpModule],
  providers: [DocumentsService, DocumentIngestionService, DocumentQAService],
  controllers: [
    DocumentsController,
    DocumentIngestionController,
    DocumentQAController,
  ],
})
export class DocumentsModule {}
