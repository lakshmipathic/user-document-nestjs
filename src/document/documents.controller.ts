import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Express } from 'express';
import { diskStorage } from 'multer';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
          console.log(file);
          const uniqueName = `${Date.now()}-${file.originalname}`;
          console.log(uniqueName);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
  ): Promise<any> {
    return await this.documentsService.upload(file, description);
  }

  @Get()
  async findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.documentsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: { title?: string; description?: string },
  ) {
    return this.documentsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number) {
    return this.documentsService.delete(id);
  }
}
