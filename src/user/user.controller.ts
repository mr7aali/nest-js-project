import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.schema";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(":id")
  getSingleUser(@Param("id") id: string) {
    console.log(id);
    return this.userService.getUserById(id);
  }
  @Post()
  createUser(@Body() body: User) {
    const user: User = {
      email: body.email,
      name: body.name,
      balance: 0,
      u_id: body.u_id,
    };
    return this.userService.createUser(user);
  }
  @Post("/add_balance")
  addBalance(@Body() body: { id: string; amount: number }) {
    console.log(body.id);
    return this.userService.addBalance(body.id, body.amount);
  }
}
