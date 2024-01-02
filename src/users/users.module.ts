
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers : [UserController],
  providers : [UsersService, PrismaService]
})
export  class  UsersModule {

}