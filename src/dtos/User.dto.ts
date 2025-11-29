import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, IsUUID, IsNumber, IsOptional, Max, Min, IsAlphanumeric, Length } from 'class-validator';

export class GetUserDto {
	@Expose()
	@IsUUID(7, { message: 'Id must be a uuid.' })
	@IsNotEmpty({ message: 'Id is required.' })
	public id!: string;
}

export class GetAllUsersDto {
	@Expose()
	@IsOptional()
	@IsString({ message: 'Cursor must be a string.' })
	public cursor?: string;

	@Expose()
	@Transform(({ value }) => parseInt(value ?? 100, 10))
	@IsNumber({}, { message: 'Limit must be a number.' })
	@Min(1)
	@Max(1000)
	public limit!: number;
}
