import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class GetAllUsersDto {
	@Expose()
	@IsString({ message: 'Cursor must be a number.' })
	@Transform(val => BigInt(val.value))
	public cursor?: string;

	@Expose()
	@IsNumber({}, { message: 'Limit must be a number.' })
	@Transform(val => BigInt(val.value))
	@Min(1)
	@Max(1000)
	public limit: number = 100;
}
