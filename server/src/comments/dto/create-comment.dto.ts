import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  userId: string;

  @IsNumber()
  postId: number;

  @IsString()
  text: string;
}
