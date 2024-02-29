import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { config as sequelizeConfig } from './_database/ts-config/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { TagsModule } from './tags/tags.module';
import { ProductTagModule } from './_relations/product-tag.model';
import { IsUniqueConstraint } from './_core/decorators/is-unique.decorator';

@Module({
  imports: [
    SequelizeModule.forRoot(
      sequelizeConfig[process.env.NODE_ENV || 'development'],
    ),
    UsersModule,
    ProductsModule,
    SalesModule,
    TagsModule,
    ProductTagModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
