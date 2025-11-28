import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';

export class GetAllPostsDto {
	@IsString({ message: 'Cursor must be a number.' })
	@Transform(val => BigInt(val.value))
	public cursor?: string;

	@IsNumber({}, { message: 'Limit must be a number.' })
	@Transform(val => BigInt(val.value))
	@Min(1)
	@Max(1000)
	public limit: number = 100;

	@IsUUID(7, { message: 'userId must be a UUID.' })
	public userId?: string;
}
