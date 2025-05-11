import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/user.schema";
import { Reading, ReadingSchema } from "src/readings/readings.schema";
import { Payment, PaymentSchema } from "./payment.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Reading.name, schema: ReadingSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
