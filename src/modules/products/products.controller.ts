import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { AppResponse } from '~/common/interfaces';
import { PaginationResponse } from '~/helpers';
import { Products } from './products.schema';
import { ProductsService } from './products.service';
import { FindPaginateProduct, UpdateProductDto, CreateProductDto } from './dto';
import { IdDto } from '~/common/dto';
import { Authorize, Roles } from '~/decorators';
import { EAccountRole } from '~/constants';
import { JwtAuthGuard } from '~/guards/jwtAuth.guard';
import { RolesGuard } from '~/guards/roles.guard';

@ApiTags('[Admin] - Products')
@Controller('admin/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(EAccountRole.ADMIN)
  @Authorize()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    description: 'Create a products',
    summary: 'Create a products',
  })
  @ApiOkResponse({ type: Products })
  create(@Body() createProductDto: CreateProductDto): Promise<AppResponse<Products> | Observable<never>> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Roles(EAccountRole.ADMIN)
  @Authorize()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Get paginate products',
  })
  @ApiOkResponse({ type: Products })
  findPaginateProducts(@Query() dto: FindPaginateProduct): Promise<AppResponse<PaginationResponse<Products>>> {
    return this.productsService.findPaginateProducts(dto);
  }

  @Get(':id')
  @Roles(EAccountRole.ADMIN)
  @Authorize()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Detail products',
  })
  findOne(@Param() id: IdDto): Promise<AppResponse<Products> | Observable<never>> {
    return this.productsService.findOne(id.id);
  }

  @Put(':id')
  @Roles(EAccountRole.ADMIN)
  @Authorize()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Update Product',
  })
  update(
    @Param() id: IdDto,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<AppResponse<Products | null> | Observable<never>> {
    return this.productsService.update(id.id, updateProductDto);
  }

  @Delete(':id')
  @Roles(EAccountRole.ADMIN)
  @Authorize()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Delete video product',
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

@ApiTags('[User] - Products')
@Controller('products')

export class UserProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('all')
  @ApiOperation({
    operationId: 'getAllProducts',
    description: 'get all products',
    summary: 'Get all a products',
  })
  @ApiOkResponse({ type: Products, isArray: true })
  findAll() {
    return this.productsService.findAll();
  }

  @Get('all-by-type')
  @ApiOperation({
    operationId: 'getAllProductsByType',
    description: 'get all products by type',
    summary: 'Get all a products by type',
  })
  @ApiOkResponse({ type: Products, isArray: true })
  findAllByType() {
    return this.productsService.findAllByType();
  }
}
