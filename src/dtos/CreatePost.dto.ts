import { Escape, Trim, StripLow } from 'class-sanitizer';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, Length } from 'class-validator';

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
