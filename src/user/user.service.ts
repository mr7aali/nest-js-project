import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  async getUserById(id: string): Promise<any> {
    const user = await Promise.resolve({
      id,
      name: "John Doe",
      email: "",
    });
    return user;
  }
}
