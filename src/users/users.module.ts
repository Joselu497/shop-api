import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { QueryMiddleware } from 'src/_core/middleware/query.middleware';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QueryMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
