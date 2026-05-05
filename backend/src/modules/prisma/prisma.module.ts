import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Makes the module globally available
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export the service so it can be used in other modules
})
export class PrismaModule {}