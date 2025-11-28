import { IsEmail, IsString, Length, IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  public email!: string;

  @IsString({ message: 'Password must be a string.' })
  @Length(8, 50, { message: 'Password must be between 8 and 50 characters.' })
  @IsNotEmpty({ message: 'Password is required.' })
  public password!: string;

  @IsString({ message: 'Name must be a string.' })
  @IsAlphanumeric(undefined, {message: "Name must be alphanumeric"})
  @Length(4, 32, { message: 'Name must be between 4 and 32 characters.' })
  @IsNotEmpty({ message: 'Name is required.' })
  public name!: string;
}
