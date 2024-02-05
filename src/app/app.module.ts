import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { sampleMiddleware } from './middlewares/req-console-log.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    ThrottlerModule.forRoot({
      ttl: 1000 * 1,
      limit: 60,
    }),
    DatabaseModule,
    UsersModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(sampleMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
