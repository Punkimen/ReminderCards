import { HttpException, Injectable } from '@nestjs/common';
import { Priority } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async createCard(
    userId: number,
    value: string,
    translate: string,
    priority?: Priority,
  ) {
    if (!userId || !value || !translate) {
      throw new HttpException('Invalid data', 400);
    }

    const createdCard = await this.prisma.card.create({
      data: {
        user: userId,
        value,
        translate,
        priority: priority || Priority.MEDIUM,
      },
    });

    if (!createdCard) {
      throw new HttpException('Card not created', 500);
    }

    return createdCard;
  }

  async updateCard(
    cardId: string,
    value?: string,
    translate?: string,
    priority?: Priority,
  ) {
    const data: Record<string, any> = {};
    if (value !== undefined) data.value = value;
    if (translate !== undefined) data.translate = translate;
    if (priority !== undefined) data.priority = priority;

    return await this.prisma.card.update({
      where: { id: cardId },
      data,
    });
  }

  async deleteCard(cardId: string) {
    await this.prisma.card.delete({
      where: { id: cardId },
    });
  }

  async getCards(userId: number) {
    const data = await this.prisma.card.findMany({
      where: {
        user: userId,
      },
    });

    if (data?.length) {
      return data;
    }

    return [];
  }
}
