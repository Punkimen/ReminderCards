import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { createCardDto } from './cards.dto';
import { CardsService } from './cards.services';
import { Priority } from 'generated/prisma';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async createCard(@Body() createCardDto: createCardDto) {
    const { userId, translate, value, priority } = createCardDto;

    return await this.cardsService.createCard(
      userId,
      value,
      translate,
      priority,
    );
  }

  @Patch(':id')
  async updateCard(
    @Param('id') id: string,
    @Body('value') value?: string,
    @Body('translate') translate?: string,
    @Body('priority') priority?: Priority,
  ) {
    return await this.cardsService.updateCard(id, value, translate, priority);
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: string) {
    if (!id) return;
    console.log('deleted');
    await this.cardsService.deleteCard(id);
  }

  @Get()
  async getCards(@Query('userId') userId: string) {
    return await this.cardsService.getCards(Number(userId));
  }
}
