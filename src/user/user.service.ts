import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User, UserDocument } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
  async createUser(user: User): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }
  async addBalance(id: string, amount: number): Promise<User> {
    console.log(new Types.ObjectId(id));
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $inc: { balance: amount } },
      { new: true },
    );
    console.log(user);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    if (user.balance < 0) {
      throw new BadRequestException("Balance cannot be negative");
    }
    return user;
  }
}
