import { Transform } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeletePostDto {
	@IsUUID(7, { message: 'Id must be a number.' })
	@IsNotEmpty({ message: 'Id is required.' })
	@Transform(val => BigInt(val.value))
	public id!: string;
}
