import { Injectable } from "@nestjs/common";
import { Reading, ReadingDocument } from "./readings.schema";
import { User, UserDocument } from "src/user/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ReadingsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Reading.name) private readingModel: Model<ReadingDocument>,
  ) {}
  async getReadings() {
    return await this.readingModel.find({}).sort({ r_id: -1 }).limit(10);
  }
  async addReadings(readings: Reading) {
    const isUserExists = await this.userModel.findOne({
      u_id: readings.u_id,
      _id: readings.user_id,
    });
    if (!isUserExists) {
      throw new Error("User not found");
    }

    const existingReadings = await this.readingModel
      .find({})
      .sort({ r_id: -1 })
      .limit(1);

    if (existingReadings.length > 0) {
      console.log(existingReadings);
      readings.r_id = existingReadings[0].r_id + 1;
    }
    // console.log(readings);
    const newreading = new this.readingModel(readings);
    const savedReading = await newreading.save();
    if (!savedReading) {
      throw new Error("Error saving reading");
    }
    return savedReading;
  }
  async getReadingsByUserId(userID: string) {
    const user = await this.userModel.findById({ _id: userID });
    if (!user) {
      throw new Error("User not found");
    }
    const readings = await this.readingModel.find({ user_id: userID }).sort({
      r_id: -1,
    });

    return {
      userInfo: user,
      readings: readings,
    };
  }
}
