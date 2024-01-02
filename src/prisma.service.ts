import { PrismaClient } from '@prisma/client';
import { INestApplication, OnModuleInit } from '@nestjs/common';

export class PrismaService extends PrismaClient implements OnModuleInit {
   async onModuleInit() {
     await  this.$connect()
  }
  async enableShutdownHooks(app: INestApplication){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.$on('beforeExit',async () => {
      await app.close()
    })
  }

}

