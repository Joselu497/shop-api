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
import { Tag } from 'src/tags/tags.model';

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
    @Body() updateProductDto: Partial<ProductsDto>,
  ): Promise<Product> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }

  @Get(':id/get-tags')
  getTags(@Param('id') id: string): Promise<Tag[]> {
    return this.productsService.getTags(+id);
  }

  @Patch(':id/add-tag/:tagId')
  addTag(
    @Param('id') id: string,
    @Param('tagId') tagId: string,
  ): Promise<void> {
    return this.productsService.addTag(+id, +tagId);
  }

  @Patch(':id/remove-tag/:tagId')
  removeTag(
    @Param('id') id: string,
    @Param('tagId') tagId: string,
  ): Promise<void> {
    return this.productsService.removeTag(+id, +tagId);
  }
}
