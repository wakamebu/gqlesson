import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDrive , ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground : true,
      autoSchemaFile: join(process.cwd(), 'src/cshema.gql'),
      cors:{
        // 全て許可
        origin: '*', 
      },
    }),
    TaskModule,
  ],
})
export class AppModule {}
