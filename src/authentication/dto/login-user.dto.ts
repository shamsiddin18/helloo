import {  Length } from 'class-validator';



export  class LoginDto {


  @Length(1,10)
  email : string;


  @Length(1,12)
  password : string;

}