import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";

import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    // MongooseModule.forRoot(process.env.DATABASE_URL as string),
    // MongooseModule.forRoot(
    //   "mongodb+srv://prepaid_bill_systme:X4GEEIqSOZ7CriVo@cluster0.lopokh6.mongodb.net/prepaid_power_DB?retryWrites=true&w=majority&appName=Cluster0",
    // ),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL as string),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
