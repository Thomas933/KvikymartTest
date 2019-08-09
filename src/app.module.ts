import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    GraphQLModule.forRoot({
        autoSchemaFile: 'schema.gql',
      },
    ),
    TypeOrmModule.forRoot({}),
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
