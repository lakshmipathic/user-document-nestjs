import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { IngestionManagementService } from './ingestion-management.service';

@Controller('ingestion-management')
export class IngestionManagementController {
  constructor(private readonly ingestionService: IngestionManagementService) {}

  @Post()
  async createIngestion(@Body('documentId') documentId: number) {
    return await this.ingestionService.createIngestion(documentId);
  }

  @Get()
  async findAll() {
    return await this.ingestionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.ingestionService.findOne(id);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: string,
    @Body('errorMessage') errorMessage?: string,
  ) {
    return await this.ingestionService.updateStatus(id, status, errorMessage);
  }
}
