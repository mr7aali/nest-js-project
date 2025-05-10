import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";

import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { ReadingsModule } from "./readings/readings.module";

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL as string),
    ReadingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
