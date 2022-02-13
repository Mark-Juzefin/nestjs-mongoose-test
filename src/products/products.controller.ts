import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { PostDTO } from './dto/post.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post()
  async addProduct(@Body() dto: PostDTO) {
    return await this.productsService.insertProduct(dto);
  }

  @Get()
  async getAllProducts() {
    const data = await this.productsService.getAllProducts();
    return { count: data.length, data };
  }

  @Get(':id')
  getProduct(@Param('id') id: ObjectId) {
    return this.productsService.getSingleProduct(id);
  }

  @Patch(':id')
  async updateProduct(@Param('id') prodId: ObjectId, @Body() dto: PostDTO) {
    return await this.productsService.updateProduct(prodId, dto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: ObjectId) {
    return await this.productsService.deleteProduct(id);
  }
}
