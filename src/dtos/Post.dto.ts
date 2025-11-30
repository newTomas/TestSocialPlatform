import { Escape, Trim, StripLow } from 'class-sanitizer';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Max, Min } from 'class-validator';

export class GetPostDto {
	@Expose()
	@IsUUID(7, { message: 'Id must be a number.' })
	@IsNotEmpty({ message: 'Id is required.' })
	public id!: string;
}

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

export class EditPostDto {
	@Expose()
	@IsUUID(7, { message: 'Id must be a uuid.' })
	@IsNotEmpty({ message: 'Id is required.' })
	public id!: string;

	@Expose()
	@Escape()
	@Trim()
	@StripLow(true)
	@IsString({ message: 'Text must be a string.' })
	@IsNotEmpty({ message: 'Text is required.' })
	@Length(2, 4096, { message: 'Text must be between 2 and 4096 characters.' })
	public text!: string;
}

export class DeletePostDto {
	@Expose()
	@IsUUID(7, { message: 'Id must be a uuid.' })
	@IsNotEmpty({ message: 'Id is required.' })
	public id!: string;
}

export class CreatePostDto {
	@Expose()
	@Escape()
	@Trim()
	@StripLow(true)
	@IsString({ message: 'Text must be a string.' })
	@IsNotEmpty({ message: 'Text is required.' })
	@Length(2, 4096, { message: 'Text must be between 2 and 4096 characters.' })
	public text!: string;
}

export class PostResponseDto {
	public id!: string;
	public userId!: string;
	public text!: string;
	public createdAt!: Date;
	public updatedAt!: Date | null;
}
