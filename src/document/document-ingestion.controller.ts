import { Body, Controller, Post } from '@nestjs/common';
import { DocumentIngestionService } from './document-ingestion.service';

@Controller('documents')
export class DocumentIngestionController {
  constructor(
    private readonly documentIngestionService: DocumentIngestionService,
  ) {}

  @Post('ingest')
  async ingestDocument(
    @Body() { title, content }: { title: string; content: string },
  ) {
    return this.documentIngestionService.ingestDocument(title, content);
  }
}
