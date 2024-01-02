// import { AuthGuard } from '@nestjs/passport';
// import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor(private jwtService: JwtService) {}
//     canActivate(context: ExecutionContext) {
//       console.log(66,context);
//       return super.canActivate(context)
//     }
//     handleRequest(err, user, info) {
//       if(err || !user){
//         throw err || new UnauthorizedException()
//       }
//       return user
//     }
// }
/////////////////////////////////

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException,
  ForbiddenException,} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { token }: any = request.headers;
      if (!token || token.trim() === '') {
        throw new UnauthorizedException('No Authorized');
      }
      // const authToken = authorization.replace(/bearer/gim, '').trim();
      const resp = await this.authService.validateToken(token);
      request.headers.decodedData = resp;
      return request;
    } catch (error) {
      console.log('auth error - ', error.message);
      throw new ForbiddenException(error.message || 'session expired! Please sign In');
    }
  }
}
//////////////////////////////////////////

// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { Request } from 'express';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}
//
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);
//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     try {
//       const payload = await this.jwtService.verifyAsync(
//         token,
//         {
//           secret: jwtConstants.secret
//         }
//       );
//       // 💡 We're assigning the payload to the request object here
//       // so that we can access it in our route handlers
//       request['user'] = payload;
//     } catch {
//       throw new UnauthorizedException();
//     }
//     return true;
//   }
//
//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }