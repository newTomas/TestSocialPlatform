import { Escape, Trim, StripLow } from 'class-sanitizer';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

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
