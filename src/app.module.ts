import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { UserService } from './services/user.service';
import { PrismaService } from './prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import config from './configs/config';
import { GraphqlConfig } from './configs/config.interface';
import { AppResolver } from './resolvers/app/app.resolver';
import { UserResolver } from './resolvers/user/user.resolver';

const environment = process.env.NODE_ENV || 'local';

@Module({
  imports: [
    // https://github.com/iamolegga/nestjs-pino#asynchronous-configuration
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        autoLogging: false,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: [`.${environment}.env`, '.env'],
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const graphqlConfig = configService.get<GraphqlConfig>('graphql');
        return {
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile:
            graphqlConfig.schemaDestination || './src/schema.graphql',
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          context: ({ req }) => ({ req }),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [PrismaService, UserService, AppResolver, UserResolver],
})
export class AppModule {}
