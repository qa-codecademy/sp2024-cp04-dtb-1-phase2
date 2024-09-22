import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  userId: string;

  @IsString()
  image: string;

  @IsString()
  @MaxLength(200)
  @MinLength(0)
  title: string;

  @IsString()
  @MinLength(0)
  text: string;

  @IsString()
  tags: string[];
}
