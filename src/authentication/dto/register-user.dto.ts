// import {  Length } from 'class-validator';

export class RegisterUsersDto {

  name : string;
  username :string;
  password : string;
  email : string;
  role: string;
  posts: string[];
  viewedPosts: string[];

}