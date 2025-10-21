import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.services';

@Module({
  imports: [],
  controllers: [CardsController],
  providers: [PrismaService, CardsService],
})
export class CardsModule {}
