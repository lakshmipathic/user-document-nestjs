import { Controller, Post, Body } from '@nestjs/common';
import { DocumentQAService } from './document-qa.service';

@Controller('documents/qa')
export class DocumentQAController {
  constructor(private readonly documentQAService: DocumentQAService) {}

  @Post('ask')
  async askQuestion(@Body() { question }: { question: string }) {
    const answer = await this.documentQAService.getAnswer(question);
    return { answer };
  }
}
