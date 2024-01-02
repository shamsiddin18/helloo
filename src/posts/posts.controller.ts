import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Request, Response } from 'express';
import { CreatePostsDto } from './dto/create.posts';
import { AuthGuard } from '../authentication/auth.guard';
import { Users } from '../users/users.model';
import { Posts } from './posts.model';



@Controller('posts')
export class PostsController{
  constructor(private readonly postsService : PostsService) {
  }


  @UseGuards(AuthGuard)
  @Post('/post')
  async  createPosts(@Req() request : Request, @Res() response: Response, @Body() createPostsDto : CreatePostsDto):Promise<any> {
   try {
     const { email } : any = request.headers.decodedData
     const post = await  this.postsService.createPost(createPostsDto, email)
     return response.status(200).json({
       status: 'Good',
       message : 'Successfully create Post',
       result : post
     })
   } catch (e) {
     return response.status(500).json({
       status : 'Error',
       message : e
     })
   }
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getPost(@Req() request : Request, @Res() response: Response, @Param ('id') id : number) : Promise<any> {
    try {
      const { email }: any = request.headers.decodedData
      const post  = await this.postsService.getPost(id,email)
      return response.status(200).json({
        status: 'Good',
        message : 'Successfully Get Post',
        result : post
      })

    } catch (e) {
      return response.status(500).json({
        status : 'Error',
        message : e
      })

    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllPost( @Res() response: Response) : Promise<any> {
    try {
      const results= await this.postsService.getAllPost()
      return  response.status(200).json({
        status : 'Ok',
        message : "Successfully get all posts",
        result : results
      })
    } catch (e) {
      return response.status(500).json({
        status : 'Error!!!!',
        message: e
      })
    }
  }

}