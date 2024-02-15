import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit {
  constructor() {
    super({
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    return this.$connect().then(() => {
      console.log('database connected');
    });
  }
  onModuleDestroy() {
    return this.$disconnect();
  }
}
