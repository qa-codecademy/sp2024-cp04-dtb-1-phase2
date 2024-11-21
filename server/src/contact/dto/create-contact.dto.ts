import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  number: string;

  @IsString()
  @MinLength(50)
  @MaxLength(250)
  message: string;
}
