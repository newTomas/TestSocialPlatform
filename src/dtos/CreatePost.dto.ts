import { IsString, IsNotEmpty, Length, IsAlphanumeric } from 'class-validator';

export class CreatePostDto {
	@IsString({ message: 'Text must be a string.' })
	@IsNotEmpty({ message: 'Text is required.' })
	@IsAlphanumeric(undefined, { message: "Text must be alphanumeric" })
	@Length(2, 4096, { message: 'Text must be between 2 and 4096 characters.' })
	public text!: string;
}
