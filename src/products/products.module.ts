import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { QueryMiddleware } from 'src/_core/middleware/query.middleware';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
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
