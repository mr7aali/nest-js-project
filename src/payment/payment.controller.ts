import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { Payment } from "./payment.schema";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post("/create")
  createPayment(@Body() body: Payment) {
    return this.paymentService.createPayment(body);
  }
  @Get("/get/:id")
  getPayment(@Param("id") id: string) {
    return this.paymentService.getPayment(id);
  }
  @Get("/get-all")
  getAllPayment() {
    return this.paymentService.getAllPayment();
  }
}
