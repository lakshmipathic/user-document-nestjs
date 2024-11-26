import { Controller, Post, Get, Param, HttpException } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger/:documentId')
  async triggerIngestion(
    @Param('documentId') documentId: number,
  ): Promise<any> {
    try {
      return await this.ingestionService.triggerIngestion(documentId);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get('track/:id')
  async track(@Param('id') id: string) {
    return this.ingestionService.trackIngestion(id);
  }
}
