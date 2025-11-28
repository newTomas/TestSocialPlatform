import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class EditPostDto {
	@IsNumber({}, { message: 'Id must be a number.' })
	@IsNotEmpty({ message: 'Id is required.' })
	@Transform(val => BigInt(val.value))
	public id!: string;

	@IsString({ message: 'Text must be a string.' })
	@IsNotEmpty({ message: 'Text is required.' })
	@IsAlphanumeric(undefined, { message: "Text must be alphanumeric" })
	@Length(2, 4096, { message: 'Text must be between 2 and 4096 characters.' })
	public text!: string;
}
