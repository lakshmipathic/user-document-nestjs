import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestionManagementService } from './ingestion-management.service';
import { IngestionManagementController } from './ingestion-management.controller';
import { IngestionProcess } from './ingestion-process.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([IngestionProcess])],
  providers: [IngestionService, IngestionManagementService],
  controllers: [IngestionController, IngestionManagementController],
})
export class IngestionModule {}
