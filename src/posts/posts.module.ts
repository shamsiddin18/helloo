import { Module } from '@nestjs/common';
// import { UserController } from '../users/user.controller';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { AuthService } from '../authentication/auth.service';
import { JwtStrategy } from '../authentication/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers : [PostsController],
  providers : [UsersService, PrismaService,PostsService, AuthService, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    })
  ]
})

export class PostsModule {

}