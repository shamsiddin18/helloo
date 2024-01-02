import { UsersService } from './users.service';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('users')
export  class UserController{
  constructor(private readonly userService : UsersService) {}
  @Get()
  async getAllUsers(@Req() request : Request, @Res() response: Response):Promise<any> {

    try {
      const result  = await this.userService.getAllUser();
      return response.status(200).json({
        status: 'ok',
        message : 'Succesfullly fetch data',
        result : result
      })
    } catch (e) {
      return response.status(500).json({
        status: "bad",
        message : 'Internal server error',

      })
    }
  }
}