import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Posts } from './posts.model';
import { UsersService } from '../users/users.service';


@Injectable()
export class PostsService{

constructor(private  prisma : PrismaService,
private userService : UsersService) {
}

  async getAllPost():Promise<Posts[]>{
    return this.prisma.posts.findMany()
  }
  async createPost(data: Posts, email: string):Promise<Posts> {
    const  user = await this.userService.getUser(email)
    data.author = user.name
    return this.prisma.posts.create({ data })
  }

  async getPost(id : number, email : string): Promise<Posts> {
    const  user = await this.userService.getUser(email)
    const post  = await this.prisma.posts.findUnique({
      where : {
        id : Number(id)
      }
    })
    post.viewers.push(user.name)
    await this.userService.viewPost(email, post.title)
    return post

  }
}