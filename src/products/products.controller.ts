import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDto } from './products.dto';
import { Product } from './products.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: ProductsDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Req() req): Promise<{ rows: Product[]; count: number } | Product[]> {
    const pagination = req.pagination === 'false' ? false : true;
    return this.productsService.findAll(req.options, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: ProductsDto,
  ): Promise<Product> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}
