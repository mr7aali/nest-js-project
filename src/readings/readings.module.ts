import { Module } from "@nestjs/common";
import { ReadingsController } from "./readings.controller";
import { ReadingsService } from "./readings.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/user.schema";
import { Reading, ReadingSchema } from "./readings.schema";
// MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Reading.name, schema: ReadingSchema },
    ]),
  ],
  controllers: [ReadingsController],
  providers: [ReadingsService],
})
export class ReadingsModule {}
