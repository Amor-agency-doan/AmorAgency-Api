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
import { ProductType } from '~/constants';

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

    const { name, type } = dto;

    if (name) {
      match.name = { $regex: new RegExp(escapeRegex(name), 'i') };
    }

    if (type) {
      match.type = { $regex: new RegExp(escapeRegex(type), 'i') };
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
    };
  }

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

  async findAll() {
    return {
      content: await this.productsModel.find(),
    };
  }

  async findAllByType() {
    const FACEBOOK_PROFILE = await this.productsModel.find({ type: ProductType.FACEBOOK_PROFILE });
    const FACEBOOK_ADS_ACCOUNT = await this.productsModel.find({ type: ProductType.FACEBOOK_ADS_ACCOUNT });
    const FACEBOOK_PAGES = await this.productsModel.find({ type: ProductType.FACEBOOK_PAGES });
    const FACEBOOK_BUSINESS_ACCOUNT = await this.productsModel.find({ type: ProductType.FACEBOOK_BUSINESS_ACCOUNT });

    return {
      content: {
        FACEBOOK_PROFILE: FACEBOOK_PROFILE,
        FACEBOOK_ADS_ACCOUNT: FACEBOOK_ADS_ACCOUNT,
        FACEBOOK_PAGES: FACEBOOK_PAGES,
        FACEBOOK_BUSINESS_ACCOUNT: FACEBOOK_BUSINESS_ACCOUNT,
      },
    };
  }
}
