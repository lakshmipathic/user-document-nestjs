import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class IngestionService {
  constructor(private readonly httpService: HttpService) {}

  async triggerIngestion(documentId: number): Promise<any> {
    try {
      const response = await this.httpService.post(
        'http://python-backend-url/api/ingestion',
        { documentId },
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to trigger ingestion: ${error.message}`);
    }
  }

  async trackIngestion(id: string) {
    const response = await lastValueFrom(
      this.httpService.get(`http://python-backend/ingest/${id}`),
    );
    return response.data;
  }
}
