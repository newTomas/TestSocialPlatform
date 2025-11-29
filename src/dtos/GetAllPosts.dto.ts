import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class GetAllPostsDto {
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

	@Expose()
	@IsOptional()
	@IsUUID(7, { message: 'userId must be a UUID.' })
	public userId?: string;
}
