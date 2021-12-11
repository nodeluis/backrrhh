import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME } from './config/constants';
import { UsersModule } from './users/users.module';
import { AccessControlModule } from 'nest-access-control';
import { AuthModule } from './auth/auth.module';
import { roles } from './app.roles';
import { EmployeeModule } from './employee/employee.module';
import { EdificeModule } from './edifice/edifice.module';
import { PcauthModule } from './pcauth/pcauth.module';
import { FingerPrintModule } from './finger-print/finger-print.module';
import { HourModule } from './hour/hour.module';
import { HourHandModule } from './hour-hand/hour-hand.module';
import { ReasonModule } from './reason/reason.module';
import { TickeoModule } from './tickeo/tickeo.module';
import { RegularizationModule } from './regularization/regularization.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>(DATABASE_HOST),
        port: parseInt(config.get<string>(DATABASE_PORT), 10),
        username: config.get<string>(DATABASE_USERNAME),
        password: config.get<string>(DATABASE_PASSWORD),
        database: config.get<string>(DATABASE_NAME),
        entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
        logger: 'file',
      }),
    }),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    AccessControlModule.forRoles(roles),
    AuthModule,
    UsersModule,
    EmployeeModule,
    EdificeModule,
    PcauthModule,
    FingerPrintModule,
    HourModule,
    HourHandModule,
    ReasonModule,
    TickeoModule,
    RegularizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
