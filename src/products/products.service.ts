import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { PostDTO } from './dto/post.dto';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(dto: PostDTO): Promise<Product> {
    const newProduct = new this.productModel(dto);
    return await newProduct.save();
  }

  async getAllProducts() {
    const products = await this.productModel.find().exec();
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    })) as Product[];
  }

  async getSingleProduct(id: ObjectId) {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(id: ObjectId, dto: PostDTO) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, dto);
    return updatedProduct;
  }

  async deleteProduct(id: ObjectId) {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product');
    } else {
      return 'success';
    }
  }

  private async findProduct(id: ObjectId): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (err) {
      throw new NotFoundException('Could not find product');
    }

    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return product;
  }
}
