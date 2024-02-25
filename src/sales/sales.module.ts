import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sale } from './sales.model';
import { QueryMiddleware } from 'src/_core/middleware/query.middleware';

@Module({
  imports: [SequelizeModule.forFeature([Sale])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QueryMiddleware)
      .forRoutes({ path: 'sales', method: RequestMethod.GET });
  }
}
