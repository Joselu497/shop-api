import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { QueryMiddleware } from 'src/_core/middleware/query.middleware';
import { Tag } from './tags.model';

@Module({
  imports: [SequelizeModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QueryMiddleware)
      .forRoutes({ path: 'tags', method: RequestMethod.GET });
  }
}
