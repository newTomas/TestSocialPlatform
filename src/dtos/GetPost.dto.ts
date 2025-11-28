import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetPostDto {
	@IsNumber({}, { message: 'Id must be a number.' })
	@IsNotEmpty({ message: 'Id is required.' })
	@Transform(val => BigInt(val.value))
	public id!: bigint;
}
