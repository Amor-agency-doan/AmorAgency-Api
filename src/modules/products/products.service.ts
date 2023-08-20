import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products, ProductsDocument } from './products.schema';
import { Model } from 'mongoose';
import { AppResponse, PaginationResponse } from '~/common/interfaces';
import { Observable } from 'rxjs';
import PaginationHelper from '~/helpers/pagination.helper';
import { FindPaginateProduct } from './dto';
import { escapeRegex } from '~/helpers';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Products.name) readonly productsModel: Model<ProductsDocument>) {}

  async create(createProductDto: CreateProductDto): Promise<AppResponse<Products> | Observable<never>> {
    const { name } = createProductDto;
    const nameTrim = name.trim();

    return {
      content: await this.productsModel.create({
        ...createProductDto,
        name: nameTrim,
      }),
    };
  }

  async findPaginateProducts(dto: FindPaginateProduct): Promise<AppResponse<PaginationResponse<Products>>> {
    const { page, perPage, match, skip } = PaginationHelper.getQueryByPagination<Products, FindPaginateProduct>(dto);

    const { name } = dto;

    if (name) {
      match.name = { $regex: new RegExp(escapeRegex(name), 'i') };
    }

    const [videos, count] = await Promise.all([
      this.productsModel.find(match).sort({ createdAt: 'desc' }).limit(perPage).skip(skip),
      this.productsModel.countDocuments(match),
    ]);
    return {
      content: PaginationHelper.getPaginationResponse({ page: page, data: videos, perPage: perPage, total: count }),
    };
  }

  async findOne(id: string): Promise<AppResponse<Products> | Observable<never>> {
    const product = await this.findByField({ _id: id });

    if (product instanceof Observable) {
      return product;
    }

    return {
      content: product,
    };
  }

  async findByField(filter: object): Promise<Products | Observable<never>> {
    const product = await this.productsModel.findOne(filter);

    if (!product) {
      throw new BadRequestException('Product not exist');
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<AppResponse<Products | null> | Observable<never>> {

    const { name } = updateProductDto;
    const nameTrim = name.trim();

    const product = await this.findByField({ _id: id });

    if (product instanceof Observable) {
      return product;
    }

    const data: any = {
      ...updateProductDto,
      name: nameTrim,
    };

    return {
      content: await this.productsModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: data,
        },
        { new: true },
      ),
    };  }

  async remove(id: string) {
    const product = await this.productsModel.findOne({
      _id: id,
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return {
      content: await this.productsModel.findByIdAndRemove({ _id: id }),
    };
  }
}
