import { AuthService } from './auth.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login-user.dto';
import { Response, Request, response } from 'express';
import { RegisterUsersDto } from './dto/register-user.dto';
import { PostsService } from '../posts/posts.service';
import { CreatePostsDto } from '../posts/dto/create.posts';
import { AuthGuard } from './auth.guard';


@Controller('/auth')
export class AuthController{
  constructor(private readonly authService: AuthService,
  private  postsService : PostsService) {
  }


  @Post('/login')
  async login(@Req() request: Request, @Res() response: Response, @Body() loginDto: LoginDto):Promise<any>{
    try {
      const  result = await  this.authService.login(loginDto);
      return response.status(200).json({
        status : 'Ok',
        message: 'Successfully ok',
        result : result
      })
    } catch (e){
      return response.status(500).json({
        status : 'Error',
        message: 'Password or Email not valid!'
      })
    }
  }

  @Post('/register')
  async register(@Req() request: Request, @Res() response: Response, @Body() registerDto: RegisterUsersDto):Promise<any>{
    try {
      const  result = await  this.authService.register(registerDto);
      return response.status(200).json({
        status : 'Ok',
        message: 'Successfully register user!',
        result : result
      })
    } catch (e){
      return response.status(500).json({
        status : 'Error',
        message: e
      })
    }

  }



  // @UseGuards(AuthGuard)
  // @Post('/post')
  // async  createPosts(@Req() request : Request, @Res() response: Response, @Body() createPostsDto : CreatePostsDto):Promise<any> {
  //   try {
  //     const { email }: any = request.headers.decodedData
  //     const post = await this.postsService.createPost(createPostsDto, email)
  //     return response.status(200).json({
  //       status: 'Good',
  //       message: 'Successfully create Post',
  //       result: post
  //     })
  //   } catch (e) {
  //     return response.status(500).json({
  //       status: 'Error',
  //       message: e
  //     })
  //   }
  // }
  //
  // @UseGuards(AuthGuard)
  // @Get('/post/:id')
  // async getPost(@Req() request : Request, @Res() response: Response, @Param ('id') id : number) : Promise<any> {
  //   try {
  //    console.log(92,id);
  //     const { email }: any = request.headers.decodedData
  //     const post  = await this.postsService.getPost(id,email)
  //     console.log(95,email,post);
  //     return
  //
  //   } catch (e) {
  //
  //   }
  // }


}