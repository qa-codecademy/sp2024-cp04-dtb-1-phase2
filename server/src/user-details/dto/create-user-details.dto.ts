import { IsNumber, IsString, Length } from 'class-validator';

export class CreateUserDetailsDto {
  @IsNumber()
  phoneNumber: number;

  @IsNumber()
  age: number;

  @IsString()
  dateOfBirth: string;

  @IsString()
  gender: string;

  @IsString()
  city: string;

  @IsString()
  country: string;
}
