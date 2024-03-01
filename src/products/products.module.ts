import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { QueryMiddleware } from 'src/_core/middleware/query.middleware';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';
import { Tag } from 'src/tags/tags.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
    SequelizeModule.forFeature([Tag]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QueryMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.GET });
  }
}
