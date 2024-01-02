import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt'
import { RegisterUsersDto } from './dto/register-user.dto';
import { Users } from '../users/users.model';
@Injectable()
export class AuthService{
  constructor(private readonly prismaService : PrismaService,

              private  readonly usersService : UsersService,
              private jwtService: JwtService
           ) {}
  async login(loginDto : LoginDto):Promise<any>{
    const {email, password} = loginDto;
    const users = await this.prismaService.users.findUnique({
      where : {email}
    })

    if(!users) {
      throw new NotFoundException('user not found')
    }
    const validatepassword = await  bcrypt.compare(password,users.password)
    if(!validatepassword) {
      throw  new NotFoundException('Invalid password')
    }

    return {
      authid : users.id,
      token: this.jwtService.sign({email})
    }
  }
  // validateToken(token: string) {
  //   return this.jwtServ.verify(token, {
  //     secret : env.JWT_SECRET
  //   });
  // }
  async register(createDto: RegisterUsersDto) : Promise<any> {

    const createUsers  = new Users()
    createUsers.name = createDto.name
    createUsers.email = createDto.email
    createUsers.username = createDto.username
    createUsers.role = createDto.role
    createUsers.password =  await  bcrypt.hash(createDto.password, 10)

    const user = await this.usersService.createUser(createUsers)
    return {
      username : user.username,
      email : user.email,
      name: user.name,
      role: user.role,
      token: this.jwtService.sign({username: user.username})
    }

  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret : process.env.JWT_SECRET
    });
  }
}