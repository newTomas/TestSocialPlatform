import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeletePostDto {
	@IsNumber({}, { message: 'Id must be a number.' })
	@IsNotEmpty({ message: 'Id is required.' })
	@Transform(val => BigInt(val.value))
	public id!: string;
}
