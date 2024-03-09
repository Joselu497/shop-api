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
import { SalesService } from './sales.service';
import { SalesDto } from './sales.dto';
import { Sale } from './sales.model';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: SalesDto): Promise<Sale> {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  findAll(@Req() req): Promise<{ rows: Sale[]; count: number } | Sale[]> {
    const pagination = req.pagination === 'false' ? false : true;
    return this.salesService.findAll(req.options, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Sale> {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaleDto: Partial<SalesDto>,
  ): Promise<Sale> {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.salesService.remove(+id);
  }
}
