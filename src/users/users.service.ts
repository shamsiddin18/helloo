import { PrismaService } from '../prisma.service';
import { Users } from './users.model';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class  UsersService{
  constructor (private prisma: PrismaService) {}

    async  getAllUser():Promise<Users[]>{
      return  this.prisma.users.findMany()
    }

    async  createUser(data: Users): Promise<Users>{
      const existing = await this.prisma.users.findUnique({
        where :{
          email: data.email
        }
      })

      if(existing) {
        throw new ConflictException('username already exists')
      }
      return  this.prisma.users.create({
        data
      })
    }

    async getUser(email: string):  Promise<Users | null>  {
    const  user = await this.prisma.users.findUnique({
      where : {
        email: email
      }
    })
      return user
    }
    async viewPost(email : string, title : string): Promise<any> {
      console.log(3777);
      const  user = await this.prisma.users.findUnique({
        where : {
          email: email
        }
      })
      user.viewedPosts.push(title)
      return user
    }


}
