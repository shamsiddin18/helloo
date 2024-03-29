import { PassportStrategy } from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt'
// import { Strategy } from 'passport-local';
import {PrismaService} from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly  prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration : false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload:{email : string}){
    const users = await  this.prismaService.users.findUnique({
      where : {
        email : payload.email
      }
    })
    return users;
  }


}

