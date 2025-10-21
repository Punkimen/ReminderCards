import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bot } from 'grammy';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService implements OnModuleInit {
  private bot: Bot;
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}
  onModuleInit() {
    const token = this.configService.get<string>('BOT_TOKEN');

    if (!token) {
      throw new Error('BOT_TOKEN is not defined in environment variables');
    }

    this.bot = new Bot(token);

    this.bot.start();

    this.bot.command('start', async (ctx) => {
      await ctx.reply('Welcome to the English Reminder Bot!');

      const card = await this.prisma.card.create({
        data: {
          user: ctx.chat.id,
          value: 'hello',
          translate: 'привет',
        },
      });

      console.log({ card });
    });

    this.bot.on('message', async (ctx) => {
      console.log('message', ctx.chat);
      const data = ctx.message.web_app_data?.data;

      if (data) {
        console.log({ data });
      }

      const responce = await this.prisma.card.findMany({
        where: { user: ctx.chat.id },
      });
      console.log(responce);
      await ctx.reply('Message received!');
    });
  }
}
