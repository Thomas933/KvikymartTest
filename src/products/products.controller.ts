import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
