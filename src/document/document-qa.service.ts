import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DocumentQAService {
  constructor(private readonly httpService: HttpService) {}

  async getAnswer(question: string) {
    const pythonBackendUrl =
      process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';
    const url = `${pythonBackendUrl}/api/qa`; // Replace with the actual FastAPI URL
    try {
      const response = await this.httpService
        .post(url, { question })
        .toPromise();
      return response.data.answer;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Failed to get an answer');
    }
  }
}
