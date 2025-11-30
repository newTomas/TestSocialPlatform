import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, Length, IsAlphanumeric } from 'class-validator';
import { UserResponseDto } from './User.dto.js';

export class RefreshTokenDto {
	@Expose()
	@IsString({ message: 'RefreshToken must be a string.' })
	@IsNotEmpty({ message: 'RefreshToken is required.' })
	public refreshToken!: string;
}

export class LoginUserDto {
	@Expose()
	@IsEmail({}, { message: 'Email must be a valid email address.' })
	@IsNotEmpty({ message: 'Email is required.' })
	public email!: string;

	@Expose()
	@IsString({ message: 'Password must be a string.' })
	@IsNotEmpty({ message: 'Password is required.' })
	public password!: string;
}

export class CreateUserDto {
	@Expose()
	@IsEmail({}, { message: 'Email must be a valid email address.' })
	@IsNotEmpty({ message: 'Email is required.' })
	public email!: string;

	@Expose()
	@IsString({ message: 'Password must be a string.' })
	@Length(8, 50, { message: 'Password must be between 8 and 50 characters.' })
	@IsNotEmpty({ message: 'Password is required.' })
	public password!: string;

	@Expose()
	@IsString({ message: 'Name must be a string.' })
	@IsAlphanumeric(undefined, { message: "Name must be alphanumeric" })
	@Length(4, 32, { message: 'Name must be between 4 and 32 characters.' })
	@IsNotEmpty({ message: 'Name is required.' })
	public name!: string;
}

export class AuthResponseDto {
	public user!: UserResponseDto;
	public accessToken!: string;
	public refreshToken!: string;
}
