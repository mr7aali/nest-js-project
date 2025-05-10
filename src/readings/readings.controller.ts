import { Reading } from "./readings.schema";
import { ReadingsService } from "./readings.service";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller("readings")
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}
  @Post("/create")
  addReadings(@Body() body: Reading) {
    const reading: Reading = {
      r_id: 0,
      user_id: body.user_id,
      date: body.date,
      value: body.value,
      u_id: body.u_id,
      unit: 0,
    };
    return this.readingsService.addReadings(reading);
  }
  @Get("/get/:id")
  getReadingsByUserId(@Param("id") id: string) {
    return this.readingsService.getReadingsByUserId(id);
  }
  @Get("/get")
  getReadings() {
    return this.readingsService.getReadings();
  }
}
