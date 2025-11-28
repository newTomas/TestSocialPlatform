import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';

export class GetAllPostsDto {
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

	@Expose()
	@IsUUID(7, { message: 'userId must be a UUID.' })
	public userId?: string;
}
