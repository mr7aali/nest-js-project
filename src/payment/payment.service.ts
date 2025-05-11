import { Injectable } from "@nestjs/common";
import { Payment, PaymentDocument } from "./payment.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/user/user.schema";
import { Reading, ReadingDocument } from "src/readings/readings.schema";
import { Connection, Model } from "mongoose";

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Reading.name) private readingModel: Model<ReadingDocument>,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}
  // async createPayment(createPayment: Payment): Promise<Payment> {
  //   const result = await this.paymentModel.create(createPayment);
  //   const updateReadingPrepaid = await this.readingModel.updateOne(
  //     {
  //       r_id: createPayment.r_id,
  //     },
  //     {
  //       $set: {
  //         prepaidAmmount: createPayment.ammount,
  //       },
  //     },
  //   );
  //   const updateUserBal = await this.userModel.updateOne(
  //     {
  //       _id: createPayment.user_id,
  //     },
  //     {
  //       $inc: {
  //         balance: createPayment.ammount,
  //       },
  //     },
  //   );
  //   return result;
  // }
  async createPayment(createPayment: Payment): Promise<Payment> {
    const session = await this.connection.startSession();
    session.startTransaction();

    const isRadingExist = await this.readingModel.findOne({
      r_id: createPayment.r_id,
    });
    if (!isRadingExist) {
      throw new Error("Reading not exist");
      // return ;
    }
    const isUserExits = await this.userModel.findById({
      _id: createPayment.user_id,
    });
    if (!isUserExits) {
      throw new Error("Reading not exist");
    }
    try {
      // 1. Create payment
      const result = await this.paymentModel.create([createPayment], {
        session,
      });

      // 2. Update reading
      await this.readingModel.updateOne(
        { r_id: createPayment.r_id },
        {
          $set: {
            prepaidAmmount: createPayment.ammount,
          },
        },
        { session },
      );

      // 3. Update user balance
      await this.userModel.updateOne(
        { _id: createPayment.user_id },
        {
          $inc: {
            balance: createPayment.ammount,
          },
        },
        { session },
      );

      // ✅ Commit the transaction
      await session.commitTransaction();
      await session.endSession();

      return result[0]; // since `create()` returns an array when passed as array
    } catch (error) {
      // ❌ Rollback on error
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }
  async getPayment(id: string): Promise<Payment> {
    const result = await this.paymentModel.findById(id);
    if (!result) {
      throw new Error(`Payment with ID ${id} not found`);
    }
    return result;
  }
  async getAllPayment(): Promise<Payment[]> {
    const result = await this.paymentModel.find({});
    return result;
  }
}
