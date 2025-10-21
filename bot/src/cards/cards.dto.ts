import { IsInt, IsString, ValidateNested } from 'class-validator';
import { Priority } from 'generated/prisma';
export class createCardDto {
  @IsInt()
  userId: number;
  @IsString()
  value: string;
  @IsString()
  translate: string;
  @ValidateNested()
  priority?: Priority;
}
