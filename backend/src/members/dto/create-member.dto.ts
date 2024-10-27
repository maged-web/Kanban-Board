import { IsString, IsInt, IsEmail, IsOptional, Min } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  status?: string = 'Unclaimed';
}
