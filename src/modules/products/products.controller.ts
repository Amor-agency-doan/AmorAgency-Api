import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { AppResponse } from '~/common/interfaces';
import { PaginationResponse } from '~/helpers';
import { Products } from './products.schema';
import { ProductsService } from './products.service';
import { FindPaginateProduct, UpdateProductDto, CreateProductDto } from './dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
    description: 'Create a products',
    summary: 'Create a products',
  })
  @ApiOkResponse({ type: Products })
  create(@Body() createProductDto: CreateProductDto): Promise<AppResponse<Products> | Observable<never>> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get paginate products',
  })
  @ApiOkResponse({ type: Products })
  findPaginateProducts(@Query() dto: FindPaginateProduct): Promise<AppResponse<PaginationResponse<Products>>> {
    return this.productsService.findPaginateProducts(dto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Detail products library',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
