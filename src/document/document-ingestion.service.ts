import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DocumentIngestionService {
  constructor(@Inject(HttpService) private httpService: HttpService) {}

  async ingestDocument(title: string, content: string) {
    const pythonBackendUrl =
      process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';
    const url = `${pythonBackendUrl}/api/ingestion`; // Replace with the actual FastAPI URL
    try {
      const response = await this.httpService
        .post(url, {
          title,
          content,
        })
        .toPromise();
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Failed to ingest document');
    }
  }
}
